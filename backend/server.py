import logging
import os
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timedelta
from typing import Optional, List, Any

import stripe
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import jwt
from mangum import Mangum
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

# --- Order Models ---
class OrderItem(BaseModel):
    id: str
    name: str = ""
    price: float = 0.0
    quantity: int
    image: str = ""

class ShippingInfo(BaseModel):
    firstName: str
    lastName: str
    email: str
    address: str
    city: str
    state: str
    zip: str

class PaymentInfo(BaseModel):
    cardNumber: str
    expiry: str
    cvv: str

class OrderCreate(BaseModel):
    items: List[OrderItem]
    shipping: ShippingInfo
    payment: PaymentInfo
    total: float

class OrderResponse(BaseModel):
    id: str
    created_at: str

# --- Logging Configuration ---
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
log_handlers = [logging.StreamHandler()]
# Remove FileHandler for Vercel read-only file system compatibility
# if ENVIRONMENT == "development":
#     log_handlers.append(logging.FileHandler("fitgear_api.log"))
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=log_handlers,
)
logger = logging.getLogger(__name__)

# --- Database Setup ---
MONGO_URL = os.getenv("MONGO_URL")
if not MONGO_URL:
    raise ValueError("MONGO_URL environment variable not set")


# --- Lifespan Manager for DB Connection ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Application startup...")
    try:
        app.state.client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
        app.state.db = app.state.client.fitgear
        await app.state.client.admin.command("ping")
        logger.info("✅ Connected to MongoDB")
        await setup_database(app.state.db)
        logger.info("Application startup completed successfully")
    except Exception as e:
        logger.error(f"Could not connect to MongoDB: {e}")
        app.state.client = None
        app.state.db = None

    yield

    if app.state.client:
        logger.info("Application shutdown...")
        app.state.client.close()
        logger.info("MongoDB connection closed.")


async def setup_database(db: AsyncIOMotorClient):
    logger.info("Setting up database indexes and initial data...")
    # Create indexes
    await db.products.create_index([("category", 1), ("is_active", 1)])
    await db.products.create_index(
        [("name", "text"), ("description", "text"), ("brand", "text")]
    )
    await db.users.create_index([("email", 1)], unique=True)
    logger.info("Database indexes created.")

    # Create sample data if collections are empty
    if await db.products.count_documents({}) == 0:
        logger.info("No products found, creating sample products...")
        from sample_data import sample_products

        await db.products.insert_many(sample_products)
        logger.info(f"{len(sample_products)} sample products created.")

    if await db.blog_posts.count_documents({}) == 0:
        logger.info("No blog posts found, creating sample posts...")
        from sample_data import sample_posts

        await db.blog_posts.insert_many(sample_posts)
        logger.info(f"{len(sample_posts)} sample blog posts created.")


# --- FastAPI App Initialization ---
app = FastAPI(
    title="FitGear API",
    version="1.0.0",
    description="Production-ready e-commerce API for FitGear",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan,
)

# --- Middleware ---
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
# CORS Configuration
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

# Add default local origins if in development
if ENVIRONMENT == "development" and "http://localhost:3000" not in allowed_origins:
    allowed_origins.append("http://localhost:3000")

logger.info(f"Configured ALLOWED_ORIGINS: {allowed_origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


# --- Global Exception Handlers ---
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    logger.error(f"Validation error on {request.url}: {exc.errors()}")
    return JSONResponse(
        status_code=422, content={"detail": "Validation error", "errors": exc.errors()}
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception on {request.url}: {str(exc)}", exc_info=True)
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})


# --- Security & JWT ---
SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY environment variable must be set for security")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# --- Stripe Configuration ---
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


# --- Pydantic Models ---
# (Pydantic models remain the same as before)
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class Product(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    price: float
    category: str
    # ... other fields


# --- Dependency Injection for Database ---
def get_db(request: Request) -> AsyncIOMotorClient:
    if request.app.state.db is None:
        raise HTTPException(status_code=503, detail="Database not connected")
    return request.app.state.db


# --- Utility Functions ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


async def get_user_by_id(db: AsyncIOMotorClient, user_id: str):
    user = await db.users.find_one({"_id": user_id})
    if not user:
        try:
            user = await db.users.find_one({"_id": ObjectId(user_id)})
        except Exception:
            return None
    return user


async def get_current_user_id(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncIOMotorClient = Depends(get_db),
):
    try:
        payload = jwt.decode(
            credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM]
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
            )

        user = await get_user_by_id(db, user_id)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
            )

        return str(user["_id"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired"
        )
    except jwt.JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )


# --- API Routes ---


@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}


@app.get("/api/health")
async def health_check(db: Any = Depends(get_db)):
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}

# --- Order Creation Endpoint ---
@app.post("/api/orders", response_model=OrderResponse)
async def create_order(order: OrderCreate, db: Any = Depends(get_db)):
    order_id = str(uuid.uuid4())
    order_doc = {
        "_id": order_id,
        "items": [item.dict() for item in order.items],
        "shipping": order.shipping.dict(),
        "payment": order.payment.dict(),
        "total": order.total,
        "created_at": datetime.utcnow().isoformat(),
        "status": "confirmed",
    }
    await db.orders.insert_one(order_doc)
    return {"id": order_id, "created_at": order_doc["created_at"]}


# --- Get Order Details Endpoint ---
@app.get("/api/orders/{order_id}")
async def get_order(order_id: str, db: Any = Depends(get_db)):
    order = await db.orders.find_one({"_id": order_id})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Calculate estimated delivery (5 days from order date)
    created_at = datetime.fromisoformat(order["created_at"]) if isinstance(order["created_at"], str) else order["created_at"]
    estimated_delivery = created_at + timedelta(days=5)
    
    # Format the response to match frontend expectations
    return {
        "id": str(order["_id"]),
        "date": order["created_at"],
        "status": order.get("status", "confirmed"),
        "estimatedDelivery": estimated_delivery.isoformat(),
        "items": order["items"],
        "shipping": {
            "name": f"{order['shipping']['firstName']} {order['shipping']['lastName']}",
            "address": order["shipping"]["address"],
            "city": order["shipping"]["city"],
            "state": order["shipping"]["state"],
            "zip": order["shipping"]["zip"],
            "email": order["shipping"]["email"],
            "phone": order["shipping"].get("phone", "N/A")
        },
        "payment": {
            "method": "Visa",
            "last4": order["payment"]["cardNumber"][-4:] if len(order["payment"]["cardNumber"]) >= 4 else "****",
            "total": order["total"]
        },
        "tax": order["total"] * 0.08
    }


@app.post("/api/auth/register")
async def register(user: UserCreate, db: AsyncIOMotorClient = Depends(get_db)):
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = get_password_hash(user.password)
    user_id = str(uuid.uuid4())
    user_data = {
        "_id": user_id,
        "email": user.email,
        "password": hashed_password,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": True,
        "is_admin": False,
        "created_at": datetime.utcnow(),
    }
    await db.users.insert_one(user_data)
    access_token = create_access_token(data={"sub": user_id})
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/api/auth/login")
async def login(form_data: UserLogin, db: AsyncIOMotorClient = Depends(get_db)):
    user = await db.users.find_one({"email": form_data.email})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")

    access_token = create_access_token(data={"sub": str(user["_id"])})
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/api/auth/me")
async def get_current_user_profile(
    user_id: str = Depends(get_current_user_id),
    db: AsyncIOMotorClient = Depends(get_db),
):
    user = await get_user_by_id(db, user_id)
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "is_admin": user.get("is_admin", False),
    }


@app.get("/api/products")
async def get_products(
    db: AsyncIOMotorClient = Depends(get_db),
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50,
):
    query = {"is_active": True}
    if category:
        query["category"] = category
    if search:
        query["$text"] = {"$search": search}

    products = await db.products.find(query).limit(limit).to_list(length=limit)
    for p in products:
        p["id"] = str(p["_id"])
        p["_id"] = str(p["_id"])
        if "created_at" in p:
            p["created_at"] = (
                p["created_at"].isoformat()
                if hasattr(p["created_at"], "isoformat")
                else str(p["created_at"])
            )

    return {"products": products}


@app.get("/api/products/{product_id}")
async def get_product(product_id: str, db: AsyncIOMotorClient = Depends(get_db)):
    product = await db.products.find_one({"_id": product_id, "is_active": True})
    if not product:
        try:
            product = await db.products.find_one(
                {"_id": ObjectId(product_id), "is_active": True}
            )
        except Exception:
            pass
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product["id"] = str(product["_id"])
    product["_id"] = str(product["_id"])
    if "created_at" in product:
        product["created_at"] = (
            product["created_at"].isoformat()
            if hasattr(product["created_at"], "isoformat")
            else str(product["created_at"])
        )
    return product


@app.get("/api/categories")
async def get_categories(db: AsyncIOMotorClient = Depends(get_db)):
    categories = await db.products.distinct("category", {"is_active": True})
    return {"categories": sorted(categories)}


@app.get("/api/blog")
async def get_blog_posts(db: AsyncIOMotorClient = Depends(get_db)):
    posts = await db.blog_posts.find({"is_published": True}).to_list(length=100)
    for p in posts:
        p["id"] = str(p["_id"])
        p["_id"] = str(p["_id"])
        if "created_at" in p:
            p["created_at"] = (
                p["created_at"].isoformat()
                if hasattr(p["created_at"], "isoformat")
                else str(p["created_at"])
            )

    return {"posts": posts}


@app.get("/api/blog/{post_id}")
async def get_blog_post(post_id: str, db: AsyncIOMotorClient = Depends(get_db)):
    post = await db.blog_posts.find_one({"_id": post_id})
    if not post:
        try:
            post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        except Exception:
            pass
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post["id"] = str(post["_id"])
    post["_id"] = str(post["_id"])
    if "created_at" in post:
        post["created_at"] = (
            post["created_at"].isoformat()
            if hasattr(post["created_at"], "isoformat")
            else str(post["created_at"])
        )
    return post


@app.post("/api/payment/create-intent")
async def create_payment_intent(request: Request):
    try:
        data = await request.json()
        amount = data.get("amount")

        if not amount or amount <= 0:
            raise HTTPException(status_code=400, detail="Invalid amount")

        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency="usd",
            automatic_payment_methods={"enabled": True},
        )
        return {"client_secret": intent.client_secret}
    except Exception as e:
        logger.error(f"Error creating payment intent: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/payment/confirm")
async def confirm_payment(request: Request, db: AsyncIOMotorClient = Depends(get_db)):
    try:
        data = await request.form()
        payment_intent_id = data.get("payment_intent_id")
        shipping_address = data.get("shipping_address")

        if not payment_intent_id or not shipping_address:
            raise HTTPException(status_code=400, detail="Missing payment intent or shipping address")

        # You would typically create an order in your database here
        # For now, we'll just log the information
        logger.info(f"Payment confirmed for intent: {payment_intent_id}")
        logger.info(f"Shipping address: {shipping_address}")

        return {"success": True}
    except Exception as e:
        logger.error(f"Error confirming payment: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# --- Vercel Handler ---
handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn

    PORT = int(os.getenv("PORT", 8001))
    HOST = os.getenv("HOST", "0.0.0.0")
    uvicorn.run(app, host=HOST, port=PORT)
