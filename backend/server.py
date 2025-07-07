from fastapi import FastAPI, HTTPException, Depends, status, File, UploadFile, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
import hashlib
import secrets
import jwt
from passlib.context import CryptContext
import stripe
from bson import ObjectId
import io
import gridfs
from PIL import Image
import uuid

load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="FitGear API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/fitgear")
client = AsyncIOMotorClient(MONGO_URL)
db = client.fitgear

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 hours

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Stripe configuration
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Pydantic models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str

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
    specifications: dict = {}
    is_active: bool = True
    created_at: datetime = datetime.utcnow()

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    brand: str
    inventory: int = 0
    specifications: dict = {}

class CartItem(BaseModel):
    product_id: str
    quantity: int
    price: float

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

class Order(BaseModel):
    id: Optional[str] = None
    user_id: str
    items: List[CartItem]
    total: float
    status: str = "pending"
    payment_intent_id: Optional[str] = None
    shipping_address: dict
    created_at: datetime = datetime.utcnow()

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

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return user_id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# API Routes

@app.get("/")
async def root():
    return {"message": "FitGear API is running!"}

# Authentication routes
@app.post("/api/auth/register")
async def register(user: UserCreate):
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

@app.post("/api/auth/login")
async def login(user: UserLogin):
    # Find user
    db_user = await db.users.find_one({"email": user.email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    # Create access token
    access_token = create_access_token(
        data={"sub": str(db_user["_id"])},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(db_user["_id"]),
            "email": db_user["email"],
            "first_name": db_user["first_name"],
            "last_name": db_user["last_name"],
            "is_admin": db_user.get("is_admin", False)
        }
    }

@app.get("/api/auth/me")
async def get_current_user(user_id: str = Depends(verify_token)):
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": str(user["_id"]),
        "email": user["email"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "is_admin": user.get("is_admin", False)
    }

# Product routes
@app.get("/api/products")
async def get_products(
    category: Optional[str] = None,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    page: int = 1,
    limit: int = 12
):
    query = {"is_active": True}
    
    if category:
        query["category"] = category
    
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}},
            {"brand": {"$regex": search, "$options": "i"}}
        ]
    
    if min_price is not None:
        query["price"] = {"$gte": min_price}
    
    if max_price is not None:
        if "price" in query:
            query["price"]["$lte"] = max_price
        else:
            query["price"] = {"$lte": max_price}
    
    skip = (page - 1) * limit
    
    products = await db.products.find(query).skip(skip).limit(limit).to_list(length=limit)
    total = await db.products.count_documents(query)
    
    # Convert ObjectId to string
    for product in products:
        product["id"] = str(product["_id"])
        del product["_id"]
    
    return {
        "products": products,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

@app.get("/api/products/{product_id}")
async def get_product(product_id: str):
    try:
        product = await db.products.find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        
        product["id"] = str(product["_id"])
        del product["_id"]
        
        return product
    except Exception as e:
        raise HTTPException(status_code=404, detail="Product not found")

@app.post("/api/products")
async def create_product(product: ProductCreate, user_id: str = Depends(verify_token)):
    # Check if user is admin
    user = await db.users.find_one({"_id": ObjectId(user_id)})
    if not user or not user.get("is_admin", False):
        raise HTTPException(status_code=403, detail="Admin access required")
    
    product_data = product.dict()
    product_data["created_at"] = datetime.utcnow()
    product_data["is_active"] = True
    product_data["rating"] = 0.0
    product_data["reviews_count"] = 0
    product_data["images"] = []
    
    result = await db.products.insert_one(product_data)
    product_data["id"] = str(result.inserted_id)
    
    return product_data

@app.get("/api/categories")
async def get_categories():
    categories = await db.products.distinct("category", {"is_active": True})
    return {"categories": categories}

# Cart routes
@app.get("/api/cart")
async def get_cart(user_id: str = Depends(verify_token)):
    cart = await db.carts.find_one({"user_id": user_id})
    if not cart:
        return {"items": [], "total": 0.0}
    
    # Get product details for each item
    cart_items = []
    total = 0.0
    
    for item in cart.get("items", []):
        product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
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
    
    return {"items": cart_items, "total": total}

@app.post("/api/cart/add")
async def add_to_cart(
    product_id: str = Form(...),
    quantity: int = Form(...),
    user_id: str = Depends(verify_token)
):
    # Get product details
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
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
        cart["items"][existing_item]["quantity"] += quantity
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
    
    return {"message": "Item added to cart successfully"}

@app.delete("/api/cart/remove/{product_id}")
async def remove_from_cart(product_id: str, user_id: str = Depends(verify_token)):
    await db.carts.update_one(
        {"user_id": user_id},
        {"$pull": {"items": {"product_id": product_id}}}
    )
    return {"message": "Item removed from cart successfully"}

# Payment routes
@app.post("/api/payment/create-intent")
async def create_payment_intent(
    amount: float = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        intent = stripe.PaymentIntent.create(
            amount=int(amount * 100),  # Convert to cents
            currency='usd',
            metadata={'user_id': user_id}
        )
        
        return {
            "client_secret": intent.client_secret,
            "payment_intent_id": intent.id
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/payment/confirm")
async def confirm_payment(
    payment_intent_id: str = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        # Get user cart
        cart = await db.carts.find_one({"user_id": user_id})
        if not cart or not cart.get("items"):
            raise HTTPException(status_code=400, detail="Cart is empty")
        
        # Create order
        order_data = {
            "user_id": user_id,
            "items": cart["items"],
            "total": cart.get("total", 0),
            "status": "completed",
            "payment_intent_id": payment_intent_id,
            "shipping_address": {},  # Will be updated with actual address
            "created_at": datetime.utcnow()
        }
        
        result = await db.orders.insert_one(order_data)
        
        # Clear cart
        await db.carts.delete_one({"user_id": user_id})
        
        # Update product inventory
        for item in cart["items"]:
            await db.products.update_one(
                {"_id": ObjectId(item["product_id"])},
                {"$inc": {"inventory": -item["quantity"]}}
            )
        
        return {
            "order_id": str(result.inserted_id),
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Reviews routes
@app.get("/api/products/{product_id}/reviews")
async def get_product_reviews(product_id: str):
    try:
        reviews = await db.reviews.find({"product_id": product_id}).to_list(length=100)
        
        # Convert ObjectId to string
        for review in reviews:
            review["id"] = str(review["_id"])
            del review["_id"]
        
        return {"reviews": reviews}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/reviews")
async def add_review(
    product_id: str = Form(...),
    rating: int = Form(...),
    comment: str = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        # Get user info
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Check if user already reviewed this product
        existing_review = await db.reviews.find_one({
            "product_id": product_id,
            "user_id": user_id
        })
        
        if existing_review:
            raise HTTPException(status_code=400, detail="You have already reviewed this product")
        
        # Create review
        review_data = {
            "product_id": product_id,
            "user_id": user_id,
            "rating": rating,
            "comment": comment,
            "user_name": f"{user['first_name']} {user['last_name']}",
            "created_at": datetime.utcnow()
        }
        
        result = await db.reviews.insert_one(review_data)
        
        # Update product rating
        reviews = await db.reviews.find({"product_id": product_id}).to_list(length=1000)
        avg_rating = sum(r["rating"] for r in reviews) / len(reviews)
        
        await db.products.update_one(
            {"_id": ObjectId(product_id)},
            {
                "$set": {
                    "rating": round(avg_rating, 1),
                    "reviews_count": len(reviews)
                }
            }
        )
        
        review_data["id"] = str(result.inserted_id)
        return review_data
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

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
            product = await db.products.find_one({"_id": ObjectId(product_id)})
            if product:
                product["id"] = str(product["_id"])
                del product["_id"]
                wishlist_items.append(product)
        
        return {"items": wishlist_items}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/wishlist/add")
async def add_to_wishlist(
    product_id: str = Form(...),
    user_id: str = Depends(verify_token)
):
    try:
        # Check if product exists
        product = await db.products.find_one({"_id": ObjectId(product_id)})
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
        
        return {"message": "Item added to wishlist successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/api/wishlist/remove/{product_id}")
async def remove_from_wishlist(product_id: str, user_id: str = Depends(verify_token)):
    try:
        await db.wishlists.update_one(
            {"user_id": user_id},
            {"$pull": {"product_ids": product_id}}
        )
        return {"message": "Item removed from wishlist successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Orders routes
@app.get("/api/orders")
async def get_user_orders(user_id: str = Depends(verify_token)):
    try:
        orders = await db.orders.find({"user_id": user_id}).sort("created_at", -1).to_list(length=100)
        
        # Convert ObjectId to string and get product details
        for order in orders:
            order["id"] = str(order["_id"])
            del order["_id"]
            
            # Get product details for each item
            for item in order["items"]:
                product = await db.products.find_one({"_id": ObjectId(item["product_id"])})
                if product:
                    item["product"] = {
                        "id": str(product["_id"]),
                        "name": product["name"],
                        "images": product.get("images", [])
                    }
        
        return {"orders": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Blog routes
@app.get("/api/blog")
async def get_blog_posts(
    category: Optional[str] = None,
    page: int = 1,
    limit: int = 10
):
    query = {"is_published": True}
    
    if category:
        query["category"] = category
    
    skip = (page - 1) * limit
    
    posts = await db.blog_posts.find(query).sort("created_at", -1).skip(skip).limit(limit).to_list(length=limit)
    total = await db.blog_posts.count_documents(query)
    
    # Convert ObjectId to string
    for post in posts:
        post["id"] = str(post["_id"])
        del post["_id"]
    
    return {
        "posts": posts,
        "total": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit
    }

@app.get("/api/blog/{post_id}")
async def get_blog_post(post_id: str):
    try:
        post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        post["id"] = str(post["_id"])
        del post["_id"]
        
        return post
    except Exception as e:
        raise HTTPException(status_code=404, detail="Blog post not found")

# Initialize sample data
@app.on_event("startup")
async def startup_event():
    # Create admin user if not exists
    admin_user = await db.users.find_one({"email": "admin@fitgear.com"})
    if not admin_user:
        admin_data = {
            "email": "admin@fitgear.com",
            "password": get_password_hash("admin123"),
            "first_name": "Admin",
            "last_name": "User",
            "is_active": True,
            "is_admin": True,
            "created_at": datetime.utcnow()
        }
        await db.users.insert_one(admin_data)
        print("Admin user created: admin@fitgear.com / admin123")
    
    # Create sample products if collection is empty
    product_count = await db.products.count_documents({})
    if product_count == 0:
        sample_products = [
            {
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
        print("Sample products created")
    
    # Create sample blog posts
    blog_count = await db.blog_posts.count_documents({})
    if blog_count == 0:
        sample_posts = [
            {
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
                "title": "Home Gym Setup Guide: Essential Equipment",
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
        print("Sample blog posts created")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)