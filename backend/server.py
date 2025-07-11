from fastapi import FastAPI, HTTPException, Depends, status, File, UploadFile, Form, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List, Dict, Any
from datetime import datetime, timedelta
import os
import json
from dotenv import load_dotenv
import secrets
from jose import jwt
from passlib.context import CryptContext
import stripe
from bson import ObjectId
import uuid
import logging
from contextlib import asynccontextmanager

load_dotenv()

# --- Logging Configuration ---
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
log_handlers = [logging.StreamHandler()]
if ENVIRONMENT == 'development':
    log_handlers.append(logging.FileHandler("fitgear_api.log"))
logging.basicConfig(
    level=LOG_LEVEL,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=log_handlers
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
    app.state.client = AsyncIOMotorClient(MONGO_URL)
    app.state.db = app.state.client.fitgear
    try:
        await app.state.client.admin.command('ping')
        logger.info("✅ Connected to MongoDB")
        await setup_database(app.state.db)
        logger.info("Application startup completed successfully")
        yield
    finally:
        logger.info("Application shutdown...")
        app.state.client.close()
        logger.info("MongoDB connection closed.")

async def setup_database(db: AsyncIOMotorClient):
    logger.info("Setting up database indexes and initial data...")
    # Create indexes
    await db.products.create_index([("category", 1), ("is_active", 1)])
    await db.products.create_index([("name", "text"), ("description", "text"), ("brand", "text")])
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
    lifespan=lifespan
)

# --- Middleware ---
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Security & JWT ---
SECRET_KEY = os.getenv("SECRET_KEY", "a_very_secret_key")
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
    db: AsyncIOMotorClient = Depends(get_db)
):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        
        user = await get_user_by_id(db, user_id)
        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
        
        return str(user["_id"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# --- API Routes ---

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}

@app.get("/api/health")
async def health_check(db: AsyncIOMotorClient = Depends(get_db)):
    try:
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail="Service unavailable")

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
        "created_at": datetime.utcnow()
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
    db: AsyncIOMotorClient = Depends(get_db)
):
    user = await get_user_by_id(db, user_id)
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "is_admin": user.get("is_admin", False)
    }

@app.get("/api/products")
async def get_products(
    db: AsyncIOMotorClient = Depends(get_db),
    category: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50
):
    query = {"is_active": True}
    if category:
        query["category"] = category
    if search:
        query["$text"] = {"$search": search}
    
    products = await db.products.find(query).limit(limit).to_list(length=limit)
    for p in products:
        p["id"] = str(p["_id"])
    return {"products": products}

@app.get("/api/categories")
async def get_categories(db: AsyncIOMotorClient = Depends(get_db)):
    categories = await db.products.distinct("category", {"is_active": True})
    return {"categories": sorted(categories)}

@app.get("/api/blog")
async def get_blog_posts(db: AsyncIOMotorClient = Depends(get_db)):
    posts = await db.blog_posts.find({"is_published": True}).to_list(length=100)
    for p in posts:
        p["id"] = str(p["_id"])
    return {"posts": posts}

@app.get("/api/blog/{post_id}")
async def get_blog_post(post_id: str, db: AsyncIOMotorClient = Depends(get_db)):
    post = await db.blog_posts.find_one({"_id": post_id})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post["id"] = str(post["_id"])
    return post

# --- Vercel Handler ---
from mangum import Mangum
handler = Mangum(app)