from fastapi import FastAPI, HTTPException, Depends, status, File, UploadFile, Form, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, validator
from typing import Optional, List, Dict, Any, Callable
from datetime import datetime, timedelta
import os
import json
from dotenv import load_dotenv
import hashlib
import secrets
from jose import jwt
from passlib.context import CryptContext
import stripe
from bson import ObjectId
import io
import gridfs
from PIL import Image
import uuid
import logging
import asyncio
from functools import wraps
import time
from collections import defaultdict

load_dotenv()

# Configure logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "fitgear_api.log")  # Use relative path by default

logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="FitGear API",
    version="1.0.0",
    description="Production-ready e-commerce API for FitGear",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Rate limiting storage
request_counts = defaultdict(lambda: defaultdict(int))
request_times = defaultdict(lambda: defaultdict(list))

# Security middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["*"]  # Simplified for now
)

# CORS middleware
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# MongoDB connection with error handling
try:
    MONGO_URL = os.getenv("MONGO_URL")
    if not MONGO_URL:
        raise ValueError("MONGO_URL environment variable not set")
    
    client = AsyncIOMotorClient(MONGO_URL)
    db = client.fitgear
    
    # Test connection on startup
    @app.on_event("startup")
    async def startup_event():
        try:
            await client.admin.command('ping')
            print("✅ Connected to MongoDB")
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            
except Exception as e:
    print(f"❌ MongoDB setup failed: {e}")

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Additional Configuration from Environment
PORT = int(os.getenv("PORT", 8001))
HOST = os.getenv("HOST", "0.0.0.0")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = os.getenv("LOG_FILE", "/var/log/fitgear_api.log")
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", 10485760))  # 10MB
UPLOAD_DIRECTORY = os.getenv("UPLOAD_DIRECTORY", "uploads/")

# Email Configuration
SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
FROM_EMAIL = os.getenv("FROM_EMAIL", "noreply@fitgear.com")

# Stripe configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Enhanced Pydantic models with validation
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v

    @validator('first_name', 'last_name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        if len(v.strip()) < 2:
            raise ValueError('Name must be at least 2 characters long')
        return v.strip()

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    id: str
    email: EmailStr
    first_name: str
    last_name: str
    is_active: bool = True
    is_admin: bool = False
    created_at: datetime
    
class Product(BaseModel):
    id: Optional[str] = None
    name: str
    description: str
    price: float
    category: str
    brand: str
    images: List[str] = []
    inventory: int = 0
    rating: float = 0.0
    reviews_count: int = 0
    specifications: Dict[str, Any] = {}
    is_active: bool = True
    created_at: datetime = datetime.utcnow()

    @validator('price')
    def validate_price(cls, v):
        if v <= 0:
            raise ValueError('Price must be greater than 0')
        return round(v, 2)

    @validator('inventory')
    def validate_inventory(cls, v):
        if v < 0:
            raise ValueError('Inventory cannot be negative')
        return v

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    brand: str
    inventory: int = 0
    specifications: Dict[str, Any] = {}

    @validator('name', 'description', 'category', 'brand')
    def validate_strings(cls, v):
        if not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

class CartItem(BaseModel):
    product_id: str
    quantity: int
    price: float

    @validator('quantity')
    def validate_quantity(cls, v):
        if v <= 0:
            raise ValueError('Quantity must be greater than 0')
        return v

class Cart(BaseModel):
    user_id: str
    items: List[CartItem] = []
    total: float = 0.0
    updated_at: datetime = datetime.utcnow()

class Review(BaseModel):
    id: Optional[str] = None
    product_id: str
    user_id: str
    rating: int
    comment: str
    user_name: str
    created_at: datetime = datetime.utcnow()

    @validator('rating')
    def validate_rating(cls, v):
        if v < 1 or v > 5:
            raise ValueError('Rating must be between 1 and 5')
        return v

    @validator('comment')
    def validate_comment(cls, v):
        if len(v.strip()) < 10:
            raise ValueError('Comment must be at least 10 characters long')
        return v.strip()

class BlogPost(BaseModel):
    id: Optional[str] = None
    title: str
    content: str
    author: str
    category: str
    tags: List[str] = []
    featured_image: Optional[str] = None
    is_published: bool = True
    created_at: datetime = datetime.utcnow()

    @validator('title', 'content', 'author', 'category')
    def validate_strings(cls, v):
        if not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

class Order(BaseModel):
    id: Optional[str] = None
    user_id: str
    items: List[CartItem]
    total: float
    status: str = "pending"
    payment_intent_id: Optional[str] = None
    shipping_address: Dict[str, str]
    created_at: datetime = datetime.utcnow()

    @validator('status')
    def validate_status(cls, v):
        valid_statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
        if v not in valid_statuses:
            raise ValueError(f'Status must be one of: {", ".join(valid_statuses)}')
        return v

# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        # Verify user exists and get proper ID
        user = await get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return str(user["_id"])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Enhanced error handling will be added later

# API Routes

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0", "status": "healthy"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint for monitoring"""
    try:
        # Check database connection
        await db.command("ping")
        return {
            "status": "healthy",
            "timestamp": datetime.utcnow().isoformat(),
            "database": "connected",
            "version": "1.0.0"
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=503, detail="Service unavailable")

# Authentication routes
@app.post("/api/auth/register")
async def register(user: UserCreate):
    try:
        # Check if user already exists
        existing_user = await db.users.find_one({"email": user.email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered")
        
        # Create new user
        hashed_password = get_password_hash(user.password)
        user_data = {
            "email": user.email,
            "password": hashed_password,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_active": True,
            "is_admin": False,
            "created_at": datetime.utcnow()
        }
        
        result = await db.users.insert_one(user_data)
        user_id = str(result.inserted_id)
        
        # Create access token
        access_token = create_access_token(
            data={"sub": user_id},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        logger.info(f"User registered: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": user_id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        raise HTTPException(status_code=500, detail="Registration failed")

@app.post("/api/auth/login")
async def login(user: UserLogin):
    try:
        # Find user by email
        db_user = await db.users.find_one({"email": user.email})
        if not db_user or not verify_password(user.password, db_user["password"]):
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        # Create access token
        access_token = create_access_token(
            data={"sub": str(db_user["_id"])},  # Convert to string!
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        logger.info(f"User logged in: {user.email}")
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": str(db_user["_id"]),  # Convert to string!
                "email": db_user["email"],
                "first_name": db_user["first_name"],
                "last_name": db_user["last_name"],
                "is_admin": db_user.get("is_admin", False)
            }
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")

@app.get("/api/auth/me")
async def get_current_user(user_id: str = Depends(verify_token)):
    try:
        user = await db.users.find_one({"_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "id": user["_id"],
            "email": user["email"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "is_admin": user.get("is_admin", False)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get current user error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get user information")

# Product routes with caching
@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    page: int = 1,
    limit: int = 12
):
    try:
        # Validate pagination parameters
        if page < 1:
            page = 1
        if limit < 1 or limit > 100:
            limit = 12
        
        query = {"is_active": True}
        
        if category:
            query["category"] = category
        
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"brand": {"$regex": search, "$options": "i"}}
            ]
        
        if min_price is not None and min_price >= 0:
            query["price"] = {"$gte": min_price}
        
        if max_price is not None and max_price >= 0:
            if "price" in query:
                query["price"]["$lte"] = max_price
            else:
                query["price"] = {"$lte": max_price}
        
        skip = (page - 1) * limit
        
        # Use aggregation for better performance
        pipeline = [
            {"$match": query},
            {"$sort": {"created_at": -1}},
            {"$skip": skip},
            {"$limit": limit}
        ]
        
        products = await db.products.aggregate(pipeline).to_list(length=limit)
        total = await db.products.count_documents(query)
        
        # Convert ObjectId to string and format products
        for product in products:
            if "_id" in product:
                product["id"] = str(product["_id"])
                del product["_id"]
        
        return {
            "products": products,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }
    except Exception as e:
        logger.error(f"Get products error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch products")

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    try:
        # Try to find by custom ID first, then by ObjectId
        product = await db.products.find_one({"_id": product_id})
        if not product:
            try:
                product = await db.products.find_one({"_id": ObjectId(product_id)})
            except:
                pass
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        if "_id" in product:
            product["id"] = str(product["_id"])
            del product["_id"]
        
        return product
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch product")

@app.post("/api/products")
async def create_product(product: ProductCreate, user_id: str = Depends(verify_token)):
    try:
        # Check if user is admin
        user = await db.users.find_one({"_id": user_id})
        if not user or not user.get("is_admin", False):
            raise HTTPException(status_code=403, detail="Admin access required")
        
        product_id = str(uuid.uuid4())
        product_data = product.dict()
        product_data["_id"] = product_id
        product_data["created_at"] = datetime.utcnow()
        product_data["is_active"] = True
        product_data["rating"] = 0.0
        product_data["reviews_count"] = 0
        product_data["images"] = []
        
        await db.products.insert_one(product_data)
        product_data["id"] = product_id
        
        logger.info(f"Product created: {product.name} by {user['email']}")
        
        return product_data
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Create product error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create product")

@app.get("/api/categories")
async def get_categories():
    try:
        categories = await db.products.distinct("category", {"is_active": True})
        return {"categories": sorted(categories)}
    except Exception as e:
        logger.error(f"Get categories error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch categories")

# Cart routes
@app.get("/api/cart")
async def get_cart(user_id: str = Depends(verify_token)):
    try:
        cart = await db.carts.find_one({"user_id": user_id})
        if not cart:
            return {"items": [], "total": 0.0}
        
        # Get product details for each item
        cart_items = []
        total = 0.0
        
        for item in cart.get("items", []):
            product = await db.products.find_one({"_id": item["product_id"]})
            if not product:
                # Try ObjectId
                try:
                    product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
                except:
                    continue
            
            if product:
                cart_item = {
                    "product_id": item["product_id"],
                    "quantity": item["quantity"],
                    "price": item["price"],
                    "product": {
                        "id": str(product["_id"]),
                        "name": product["name"],
                        "images": product.get("images", [])
                    }
                }
                cart_items.append(cart_item)
                total += item["price"] * item["quantity"]
        
        return {"items": cart_items, "total": round(total, 2)}
    except Exception as e:
        logger.error(f"Get cart error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch cart")

@app.post("/api/cart/add")
async def add_to_cart(
    product_id: str = Form(...),
    quantity: int = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        if quantity <= 0:
            raise HTTPException(status_code=400, detail="Quantity must be greater than 0")
        
        # Get product details
        product = await db.products.find_one({"_id": product_id})
        if not product:
            try:
                product = await db.products.find_one({"_id": ObjectId(product_id)})
            except:
                pass
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        if product["inventory"] < quantity:
            raise HTTPException(status_code=400, detail="Insufficient inventory")
        
        # Get or create cart
        cart = await db.carts.find_one({"user_id": user_id})
        if not cart:
            cart = {"user_id": user_id, "items": []}
        
        # Check if item already exists in cart
        existing_item = None
        for i, item in enumerate(cart["items"]):
            if item["product_id"] == product_id:
                existing_item = i
                break
        
        if existing_item is not None:
            new_quantity = cart["items"][existing_item]["quantity"] + quantity
            if product["inventory"] < new_quantity:
                raise HTTPException(status_code=400, detail="Insufficient inventory")
            cart["items"][existing_item]["quantity"] = new_quantity
        else:
            cart["items"].append({
                "product_id": product_id,
                "quantity": quantity,
                "price": product["price"]
            })
        
        cart["updated_at"] = datetime.utcnow()
        
        # Update cart in database
        await db.carts.update_one(
            {"user_id": user_id},
            {"$set": cart},
            upsert=True
        )
        
        logger.info(f"Item added to cart: {product['name']} for user {user_id}")
        
        return {"message": "Item added to cart successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Add to cart error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add item to cart")

@app.delete("/api/cart/remove/{product_id}")
async def remove_from_cart(product_id: str, user_id: str = Depends(verify_token)):
    try:
        result = await db.carts.update_one(
            {"user_id": user_id},
            {"$pull": {"items": {"product_id": product_id}}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        
        logger.info(f"Item removed from cart: {product_id} for user {user_id}")
        
        return {"message": "Item removed from cart successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Remove from cart error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to remove item from cart")

# Payment routes
@app.post("/api/payment/create-intent")
async def create_payment_intent(
    amount: float = Form(...),
    user_id: str = Depends(verify_token)
):
    logger.info(f"Creating payment intent for amount {amount} and user {user_id}")
    
    # Validate Stripe configuration
    stripe_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe_key:
        logger.error("Stripe API key not configured")
        raise HTTPException(
            status_code=500,
            detail="Payment service not configured. Please check server configuration."
        )
    
    # Set the API key explicitly
    stripe.api_key = stripe_key
    
    try:
        # Validate amount
        if amount <= 0:
            raise HTTPException(status_code=400, detail="Amount must be greater than 0")
        
        # Create the payment intent with automatic payment methods
        try:
            logger.info("Starting payment intent creation process")
            
            # Get or create Stripe customer with enhanced error handling
            try:
                customer_id = await get_or_create_stripe_customer(user_id)
                logger.info(f"Got customer ID: {customer_id}")
            except stripe.error.StripeError as e:
                logger.error(f"Failed to get/create customer: {str(e)}")
                raise HTTPException(status_code=500, detail="Error processing customer information")
                
            # Continue with payment intent creation...
            
        except stripe.error.StripeError as e:
            logger.error(f"Payment intent creation failed: {str(e)}")
            raise HTTPException(status_code=500, detail="Error creating payment intent")

    except stripe.error.StripeError as e:
        logger.error(f"Stripe error occurred: {str(e)}")
        raise HTTPException(status_code=500, detail="Payment processing error")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/api/payment/confirm")
async def confirm_payment(
    payment_intent_id: str = Form(...),
    shipping_address: str = Form(...),
    user_id: str = Depends(verify_token)
):
    logger.info(f"Confirming payment for intent {payment_intent_id} and user {user_id}")
    
    try:
        # Ensure we have a valid Stripe customer
        customer_id = await get_or_create_stripe_customer(user_id)
        
        # Get the payment intent and verify it belongs to our customer
        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            if intent.customer != customer_id:
                logger.error(f"Payment intent {payment_intent_id} does not belong to customer {customer_id}")
                raise HTTPException(
                    status_code=400,
                    detail="Invalid payment intent"
                )
        except stripe.error.InvalidRequestError as e:
            logger.error(f"Error retrieving payment intent: {str(e)}")
            raise HTTPException(
                status_code=400,
                detail="Invalid payment intent"
            )
        
        # Get user cart and validate inventory in a transaction
        async with await client.start_session() as session:
            async with session.start_transaction():
                # Get cart with items
                cart = await db.carts.find_one({"user_id": user_id}, session=session)
                if not cart or not cart.get("items"):
                    logger.error(f"Empty cart for user {user_id}")
                    raise HTTPException(status_code=400, detail="Cart is empty")
                
                # Validate all items and inventory in transaction
                for item in cart["items"]:
                    product = await db.products.find_one(
                        {"_id": item["product_id"]}, 
                        session=session
                    )
                    if not product:
                        try:
                            product = await db.products.find_one(
                                {"_id": ObjectId(item["product_id"])},
                                session=session
                            )
                        except:
                            logger.error(f"Invalid product ID format: {item['product_id']}")
                            raise HTTPException(
                                status_code=400,
                                detail=f"Product not found: {item['product_id']}"
                            )
                    
                    if not product:
                        logger.error(f"Product not found: {item['product_id']}")
                        raise HTTPException(
                            status_code=400,
                            detail=f"Product not found: {item['product_id']}"
                        )
                    
                    if product["inventory"] < item["quantity"]:
                        logger.error(f"Insufficient inventory for product {product['name']}")
                        raise HTTPException(
                            status_code=400,
                            detail=f"Insufficient inventory for {product['name']}"
                        )
        
        # Parse shipping address
        try:
            shipping_info = json.loads(shipping_address)
            logger.info(f"Parsed shipping info: {shipping_info}")
        except json.JSONDecodeError as e:
            logger.error(f"Invalid shipping address format: {e}")
            raise HTTPException(status_code=400, detail="Invalid shipping address format")
        
        # Calculate total
        total = sum(item["price"] * item["quantity"] for item in cart["items"])
        
        # Verify payment intent
        try:
            # Ensure stripe API key is set
            if not stripe.api_key:
                stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
            
            # Get fresh payment intent status
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            logger.info(f"Retrieved payment intent {payment_intent_id}, initial status: {intent.status}")
            
            if intent.status == 'requires_payment_method':
                logger.error("Payment intent requires payment method")
                raise HTTPException(
                    status_code=400,
                    detail="Payment method not provided or invalid"
                )
            
            # Handle payment intent confirmation with proper state transitions
            current_status = intent.status
            logger.info(f"Current payment intent status: {current_status}")
            
            if current_status == 'requires_payment_method':
                raise HTTPException(
                    status_code=400,
                    detail="Payment method not provided. Please complete payment details."
                )
            
            if current_status == 'requires_confirmation':
                try:
                    logger.info(f"Attempting to confirm payment intent {payment_intent_id}")
                    
                    # Confirm with expanded payment method for better error handling
                    intent = stripe.PaymentIntent.confirm(
                        payment_intent_id,
                        payment_method=intent.payment_method,
                        return_url=os.getenv('FRONTEND_URL', 'http://localhost:3000'),
                        expand=['payment_method']
                    )
                    logger.info(f"Payment intent confirmation result: {intent.status}")
                    
                except stripe.error.CardError as e:
                    error_code = e.error.code
                    logger.error(f"Card error during confirmation: {error_code} - {str(e)}")
                    raise HTTPException(
                        status_code=400,
                        detail=f"Payment failed: {e.error.message}"
                    )
                except stripe.error.InvalidRequestError as e:
                    if "unexpected_state" in str(e):
                        # Handle race condition
                        logger.warning("Race condition detected, retrieving fresh payment status")
                        intent = stripe.PaymentIntent.retrieve(
                            payment_intent_id,
                            expand=['payment_method']
                        )
                        if intent.status in ['succeeded', 'requires_capture']:
                            logger.info("Payment actually succeeded, proceeding with order")
                        else:
                            raise HTTPException(
                                status_code=400,
                                detail="Payment is in an invalid state. Please try again."
                            )
                    else:
                        logger.error(f"Invalid request error: {str(e)}")
                        raise HTTPException(
                            status_code=400,
                            detail=str(e)
                        )
            
            # Final status check
            if intent.status not in ['succeeded', 'requires_capture']:
                logger.error(f"Payment intent in invalid state: {intent.status}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Payment not successful. Status: {intent.status}"
                )
            
        except stripe.error.StripeError as e:
            logger.error(f"Stripe error while verifying payment: {str(e)}")
            if "unexpected_state" in str(e):
                # Handle race condition by retrieving fresh status
                try:
                    intent = stripe.PaymentIntent.retrieve(payment_intent_id)
                    logger.info(f"Retrieved fresh payment intent status: {intent.status}")
                    if intent.status in ['succeeded', 'processing', 'requires_capture']:
                        logger.info("Payment is actually in a valid state, proceeding")
                    else:
                        raise HTTPException(
                            status_code=400, 
                            detail=f"Payment verification failed. Current status: {intent.status}"
                        )
                except stripe.error.StripeError as e2:
                    logger.error(f"Second Stripe error: {str(e)}")
                    raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")
            else:
                raise HTTPException(status_code=400, detail=f"Payment verification failed: {str(e)}")
        
        # Create order
        order_id = str(uuid.uuid4())
        order_data = {
            "_id": order_id,
            "user_id": user_id,
            "payment_intent_id": payment_intent_id,
            "items": cart["items"],
            "total": round(total, 2),
            "shipping_address": shipping_info,
            "status": "completed",  # Payment is already confirmed at this point
            "created_at": datetime.utcnow()
        }
        
        logger.info(f"Creating order {order_id} for user {user_id}")
        try:
            # Insert the order
            result = await db.orders.insert_one(order_data)
            if not result.inserted_id:
                raise Exception("Failed to create order record")
            
            order_id = str(result.inserted_id)
            logger.info(f"Created order successfully: {order_id}")
            
            # Clear the user's cart
            await db.users.update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"cart": []}}
            )
            
            return {
                "success": True,
                "order_id": order_id,
                "message": "Order created successfully"
            }
            
        except Exception as e:
            error_ref = f"{datetime.now().strftime('%Y%m%d-%H%M%S')}"
            logger.error(f"Order creation failed - Reference: {error_ref}", exc_info=True)
            raise HTTPException(
                status_code=500,
                detail="Order creation failed. Please contact support with this reference: " + error_ref
            )
        
        # Clear cart
        logger.info(f"Clearing cart for user {user_id}")
        cart_result = await db.carts.delete_one({"user_id": user_id})
        if not cart_result.deleted_count:
            logger.warning(f"Cart for user {user_id} was not found during cleanup")
        
        # Update product inventory
        inventory_updates = []
        for item in cart["items"]:
            try:
                # Try to find product by ID
                product = await db.products.find_one({"_id": item["product_id"]})
                if not product:
                    product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
                
                if product:
                    if product["inventory"] < item["quantity"]:
                        raise ValueError(f"Insufficient inventory for product {item['product_id']}")
                        
                    result = await db.products.update_one(
                        {"_id": product["_id"]},
                        {"$inc": {"inventory": -item["quantity"]}}
                    )
                    if result.modified_count:
                        inventory_updates.append(item["product_id"])
                else:
                    logger.error(f"Product {item['product_id']} not found during inventory update")
                    
            except Exception as e:
                logger.error(f"Error updating inventory for product {item['product_id']}: {str(e)}")
                # Continue processing other items even if one fails
                continue
        
        logger.info(f"Updated inventory for {len(inventory_updates)} products")
        
        logger.info(f"Order completed: {order_id} for user {user_id}")
        
        return {
            "order_id": order_id,
            "status": "success"
        }
    except HTTPException:
        raise
    except stripe.error.StripeError as e:
        error_msg = str(e)
        logger.error(f"Stripe error in payment confirmation: {error_msg}")
        raise HTTPException(
            status_code=400,
            detail=f"Payment verification failed: {error_msg}"
        )
    except ValueError as e:
        error_msg = str(e)
        logger.error(f"Validation error in order creation: {error_msg}")
        raise HTTPException(
            status_code=400,
            detail=error_msg
        )
    except Exception as e:
        error_msg = str(e)
        error_ref = datetime.utcnow().strftime("%Y%m%d-%H%M%S")
        logger.error(f"Order creation error [{error_ref}]: {error_msg}")
        logger.error(f"Full error context: payment_intent_id={payment_intent_id}, user_id={user_id}")
        
        if "insufficient" in error_msg.lower():
            raise HTTPException(
                status_code=400,
                detail="One or more items in your cart are out of stock. Please review your cart and try again."
            )
        
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create order. Please contact support with this reference: {error_ref}"
        )

# Reviews routes
@app.get("/api/products/{product_id}/reviews")
async def get_product_reviews(product_id: str, page: int = 1, limit: int = 10):
    try:
        if page < 1:
            page = 1
        if limit < 1 or limit > 50:
            limit = 10
        
        skip = (page - 1) * limit
        
        reviews = await db.reviews.find({"product_id": product_id}).skip(skip).limit(limit).to_list(length=limit)
        total = await db.reviews.count_documents({"product_id": product_id})
        
        # Convert ObjectId to string
        for review in reviews:
            if "_id" in review:
                review["id"] = str(review["_id"])
                del review["_id"]
        
        return {
            "reviews": reviews,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }
    except Exception as e:
        logger.error(f"Get product reviews error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")

@app.post("/api/reviews")
async def add_review(
    product_id: str = Form(...),
    rating: int = Form(...),
    comment: str = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        if rating < 1 or rating > 5:
            raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
        
        if len(comment.strip()) < 10:
            raise HTTPException(status_code=400, detail="Comment must be at least 10 characters long")
        
        # Get user info
        user = await db.users.find_one({"_id": user_id})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Check if product exists
        product = await db.products.find_one({"_id": product_id})
        if not product:
            try:
                product = await db.products.find_one({"_id": ObjectId(product_id)})
            except:
                pass
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Check if user already reviewed this product
        existing_review = await db.reviews.find_one({
            "product_id": product_id,
            "user_id": user_id
        })
        
        if existing_review:
            raise HTTPException(status_code=400, detail="You have already reviewed this product")
        
        # Create review
        review_id = str(uuid.uuid4())
        review_data = {
            "_id": review_id,
            "product_id": product_id,
            "user_id": user_id,
            "rating": rating,
            "comment": comment.strip(),
            "user_name": f"{user['first_name']} {user['last_name']}",
            "created_at": datetime.utcnow()
        }
        
        await db.reviews.insert_one(review_data)
        
        # Update product rating
        reviews = await db.reviews.find({"product_id": product_id}).to_list(length=1000)
        avg_rating = sum(r["rating"] for r in reviews) / len(reviews)
        
        await db.products.update_one(
            {"_id": product["_id"]},
            {
                "$set": {
                    "rating": round(avg_rating, 1),
                    "reviews_count": len(reviews)
                }
            }
        )
        
        review_data["id"] = review_id
        
        logger.info(f"Review added: {review_id} for product {product_id} by user {user_id}")
        
        return review_data
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Add review error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add review")

# Wishlist routes
@app.get("/api/wishlist")
async def get_wishlist(user_id: str = Depends(verify_token)):
    try:
        wishlist = await db.wishlists.find_one({"user_id": user_id})
        if not wishlist:
            return {"items": []}
        
        # Get product details for each item
        wishlist_items = []
        for product_id in wishlist.get("product_ids", []):
            product = await db.products.find_one({"_id": product_id})
            if not product:
                try:
                    product = await db.products.find_one({"_id": ObjectId(product_id)})
                except:
                    continue
            
            if product:
                if "_id" in product:
                    product["id"] = str(product["_id"])
                    del product["_id"]
                wishlist_items.append(product)
        
        return {"items": wishlist_items}
    except Exception as e:
        logger.error(f"Get wishlist error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch wishlist")

@app.post("/api/wishlist/add")
async def add_to_wishlist(
    product_id: str = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        # Check if product exists
        product = await db.products.find_one({"_id": product_id})
        if not product:
            try:
                product = await db.products.find_one({"_id": ObjectId(product_id)})
            except:
                pass
        
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        # Get or create wishlist
        wishlist = await db.wishlists.find_one({"user_id": user_id})
        if not wishlist:
            wishlist = {"user_id": user_id, "product_ids": []}
        
        # Add product if not already in wishlist
        if product_id not in wishlist["product_ids"]:
            wishlist["product_ids"].append(product_id)
            wishlist["updated_at"] = datetime.utcnow()
            
            await db.wishlists.update_one(
                {"user_id": user_id},
                {"$set": wishlist},
                upsert=True
            )
        
        logger.info(f"Item added to wishlist: {product['name']} for user {user_id}")
        
        return {"message": "Item added to wishlist successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Add to wishlist error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add item to wishlist")

@app.delete("/api/wishlist/remove/{product_id}")
async def remove_from_wishlist(product_id: str, user_id: str = Depends(verify_token)):
    try:
        result = await db.wishlists.update_one(
            {"user_id": user_id},
            {"$pull": {"product_ids": product_id}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Item not found in wishlist")
        
        logger.info(f"Item removed from wishlist: {product_id} for user {user_id}")
        
        return {"message": "Item removed from wishlist successfully"}
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Remove from wishlist error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to remove item from wishlist")

# Orders routes
@app.get("/api/orders")
async def get_user_orders(user_id: str = Depends(verify_token), page: int = 1, limit: int = 10):
    try:
        if page < 1:
            page = 1
        if limit < 1 or limit > 50:
            limit = 10
        
        skip = (page - 1) * limit
        
        orders = await db.orders.find({"user_id": user_id}).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
        total = await db.orders.count_documents({"user_id": user_id})
        
        # Convert ObjectId to string and get product details
        for order in orders:
            if "_id" in order:
                order["id"] = str(order["_id"])
                del order["_id"]
            
            # Get product details for each item
            for item in order["items"]:
                product = await db.products.find_one({"_id": item["product_id"]})
                if not product:
                    try:
                        product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
                    except:
                        logger.warning(f"Could not convert product ID {item['product_id']} to ObjectId")
                        continue
                
                if product:
                    item["product"] = {
                        "id": str(product["_id"]),
                        "name": product["name"],
                        "images": product.get("images", [])
                    }
        
        return {
            "orders": orders,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }
    except Exception as e:
        logger.error(f"Get user orders error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch orders")

# Blog routes
@app.get("/api/blog")
async def get_blog_posts(
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    try:
        if page < 1:
            page = 1
        if limit < 1 or limit > 50:
            limit = 10
        
        query = {"is_published": True}
        
        if category:
            query["category"] = category
        
        skip = (page - 1) * limit
        
        posts = await db.blog_posts.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
        total = await db.blog_posts.count_documents(query)
        
        # Convert ObjectId to string
        for post in posts:
            if "_id" in post:
                post["id"] = str(post["_id"])
                del post["_id"]
        
        return {
            "posts": posts,
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit
        }
    except Exception as e:
        logger.error(f"Get blog posts error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@app.get("/api/blog/{post_id}")
async def get_blog_post(post_id: str):
    try:
        post = await db.blog_posts.find_one({"_id": post_id})
        if not post:
            try:
                post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
            except:
                pass
        
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        if "_id" in post:
            post["id"] = str(post["_id"])
            del post["_id"]
        
        return post
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Get blog post error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")

# Create database indexes for better performance
@app.on_event("startup")
async def startup_event():
    try:
        # Create indexes
        await db.products.create_index([("category", 1), ("is_active", 1)])
        await db.products.create_index([("name", "text"), ("description", "text"), ("brand", "text")])
        await db.products.create_index([("price", 1)])
        await db.users.create_index([("email", 1)], unique=True)
        await db.reviews.create_index([("product_id", 1), ("user_id", 1)])
        await db.orders.create_index([("user_id", 1), ("created_at", -1)])
        await db.carts.create_index([("user_id", 1)])
        await db.wishlists.create_index([("user_id", 1)])
        await db.blog_posts.create_index([("category", 1), ("is_published", 1)])
        
        logger.info("Database indexes created successfully")
        
        # Create admin user if not exists
        admin_user = await db.users.find_one({"email": "admin@fitgear.com"})
        if not admin_user:
            admin_id = str(uuid.uuid4())
            admin_data = {
                "_id": admin_id,
                "email": "admin@fitgear.com",
                "password": get_password_hash("FitGear2025!Admin"),
                "first_name": "Admin",
                "last_name": "User",
                "is_active": True,
                "is_admin": True,
                "created_at": datetime.utcnow()
            }
            await db.users.insert_one(admin_data)
            logger.info("Admin user created: admin@fitgear.com / [password hidden]")
        
        # Create sample products if collection is empty
        product_count = await db.products.count_documents({})
        if product_count == 0:
            sample_products = [
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Professional Olympic Barbell",
                    "description": "High-quality Olympic barbell perfect for deadlifts, squats, and bench press. Made from premium steel with excellent grip.",
                    "price": 299.99,
                    "category": "Strength Training",
                    "brand": "FitGear Pro",
                    "images": ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500"],
                    "inventory": 15,
                    "rating": 4.8,
                    "reviews_count": 24,
                    "specifications": {"weight": "20kg", "length": "220cm", "material": "Steel"},
                    "is_active": True,
                    "created_at": datetime.utcnow()
                },
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Adjustable Dumbbells Set",
                    "description": "Complete adjustable dumbbell set with multiple weight plates. Perfect for home gym setups.",
                    "price": 199.99,
                    "category": "Strength Training",
                    "brand": "FitGear Home",
                    "images": ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"],
                    "inventory": 8,
                    "rating": 4.6,
                    "reviews_count": 18,
                    "specifications": {"weight_range": "5-50lbs", "material": "Cast Iron"},
                    "is_active": True,
                    "created_at": datetime.utcnow()
                },
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Premium Yoga Mat",
                    "description": "Non-slip yoga mat with excellent cushioning and grip. Perfect for yoga, pilates, and stretching.",
                    "price": 49.99,
                    "category": "Fitness Accessories",
                },
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Premium Yoga Mat",
                    "description": "Non-slip yoga mat with excellent cushioning and grip. Perfect for yoga, pilates, and stretching.",
                    "price": 49.99,
                    "category": "Fitness Accessories",
                    "brand": "ZenFit",
                    "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
                    "inventory": 25,
                    "rating": 4.7,
                    "reviews_count": 32,
                    "specifications": {"thickness": "6mm", "material": "Natural Rubber"},
                    "is_active": True,
                    "created_at": datetime.utcnow()
                },
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Resistance Bands Set",
                    "description": "Complete set of resistance bands with different resistance levels. Great for strength training and rehabilitation.",
                    "price": 29.99,
                    "category": "Fitness Accessories",
                    "brand": "FlexFit",
                    "images": ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"],
                    "inventory": 30,
                    "rating": 4.5,
                    "reviews_count": 15,
                    "specifications": {"resistance_levels": "Light, Medium, Heavy", "material": "Latex"},
                    "is_active": True,
                    "created_at": datetime.utcnow()
                }
            ]
            
            await db.products.insert_many(sample_products)
            logger.info("Sample products created")
        
        # Create sample blog posts
        blog_count = await db.blog_posts.count_documents({})
        if blog_count == 0:
            sample_posts = [
                {
                    "_id": str(uuid.uuid4()),
                    "title": "10 Essential Exercises for Building Strength",
                    "content": "Discover the fundamental exercises that form the foundation of any strength training program...",
                    "author": "FitGear Team",
                    "category": "Strength Training",
                    "tags": ["strength", "exercises", "beginner"],
                    "featured_image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                    "is_published": True,
                    "created_at": datetime.utcnow()
                },
                {
                    "_id": str(uuid.uuid4()),
                    "title": "Home Gym Setup: Essential Equipment",
                    "content": "Learn how to set up an effective home gym with the right equipment and limited space...",
                    "author": "FitGear Team",
                    "category": "Home Gym",
                    "tags": ["home gym", "equipment", "setup"],
                    "featured_image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
                    "is_published": True,
                    "created_at": datetime.utcnow()
                }
            ]
            
            await db.blog_posts.insert_many(sample_posts)
            logger.info("Sample blog posts created")
        
        logger.info("Application startup completed successfully")
        
    except Exception as e:
        logger.error(f"Startup error: {str(e)}")

async def safe_stripe_operation(operation_name: str, operation_func: Callable):
    """
    Safely execute a Stripe operation with proper error handling and logging
    """
    try:
        result = await operation_func()
        logger.info(f"Stripe operation '{operation_name}' completed successfully")
        return result
    except stripe.error.CardError as e:
        # Failed payment
        logger.error(f"Card error in {operation_name}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Payment failed: {e.user_message}")
    except stripe.error.InvalidRequestError as e:
        if "unexpected_state" in str(e):
            logger.warning(f"Race condition in {operation_name}, retrieving fresh state")
            # Handle race condition
            try:
                if hasattr(e, 'payment_intent'):
                    intent = stripe.PaymentIntent.retrieve(e.payment_intent.id)
                    logger.info(f"Retrieved fresh payment intent status: {intent.status}")
                    return intent
            except stripe.error.StripeError as e2:
                logger.error(f"Failed to recover from race condition: {str(e2)}")
                raise HTTPException(status_code=400, detail=str(e))
        logger.error(f"Invalid request in {operation_name}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except stripe.error.APIConnectionError as e:
        logger.error(f"Network error in {operation_name}: {str(e)}")
        raise HTTPException(status_code=503, detail="Unable to connect to payment service")
    except stripe.error.StripeError as e:
        logger.error(f"Stripe error in {operation_name}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in {operation_name}: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

async def get_or_create_stripe_customer(user_id: str) -> str:
    """Get or create a Stripe customer for the given user."""
    logger.info(f"Getting or creating Stripe customer for user {user_id}")
    
    # Try to find user with direct ID first
    user = await db.users.find_one({"_id": user_id})
    
    # If not found, try converting to ObjectId
    if not user:
        try:
            object_id = ObjectId(user_id)
            user = await db.users.find_one({"_id": object_id})
        except Exception as e:
            logger.error(f"Error converting user_id to ObjectId: {str(e)}")
            user = None
    
    if not user:
        logger.error(f"User not found with ID: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get user's email
    user_email = user.get("email")
    if not user_email:
        logger.error(f"User {user_id} has no email address")
        raise HTTPException(status_code=400, detail="User email not found")
    
    # Check for existing Stripe customer
    if user.get("stripe_customer_id"):
        try:
            # Verify the customer still exists in Stripe
            customer = stripe.Customer.retrieve(user["stripe_customer_id"])
            if customer and not customer.get("deleted", False):
                logger.info(f"Found existing Stripe customer {customer.id} for user {user_id}")
                return customer.id
        except stripe.error.InvalidRequestError as e:
            logger.warning(f"Invalid Stripe customer, will create new one: {str(e)}")
    
    # Create new Stripe customer
    try:
        customer = stripe.Customer.create(
            email=user_email,
            metadata={
                "user_id": str(user["_id"]),
                "created_at": datetime.utcnow().isoformat()
            },
            description=f"FitGear customer {user_email}"
        )
        
        # Store Stripe customer ID in our database
        update_result = await db.users.update_one(
            {"_id": user["_id"]},  # Use the _id from the found user document
            {"$set": {"stripe_customer_id": customer.id}}
        )
        
        if update_result.modified_count == 0:
            logger.error(f"Failed to update user {user_id} with Stripe customer ID {customer.id}")
            raise HTTPException(
                status_code=500,
                detail="Failed to save payment information"
            )
        
        logger.info(f"Created new Stripe customer {customer.id} for user {user_id}")
        return customer.id
        
    except Exception as e:
        logger.error(f"Error creating Stripe customer: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Unable to create payment profile. Please try again."
        )

async def get_user_by_id(user_id: str):
    """Helper function to get user by ID, handling both string and ObjectId formats."""
    # First try with the ID as is
    user = await db.users.find_one({"_id": user_id})
    
    # If not found, try as ObjectId
    if not user:
        try:
            object_id = ObjectId(user_id)
            user = await db.users.find_one({"_id": object_id})
        except:
            # If conversion fails, try looking up by string ID field
            user = await db.users.find_one({"id": user_id})
    
    return user

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "status": "healthy", "version": "1.0.0"}

@app.get("/api")
async def api_root():
    return {"message": "FitGear API endpoint", "available_endpoints": ["/api/products", "/api/health", "/api/auth"]}

# Vercel handler
from mangum import Mangum
handler = Mangum(app)

# Local development
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=HOST, port=PORT)

