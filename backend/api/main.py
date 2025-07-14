from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from datetime import datetime
import uuid

# Environment variables
MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://username:password@cluster0.mongodb.net/fitgear?retryWrites=true&w=majority")

# FastAPI app
app = FastAPI(title="FitGear API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
client = None
db = None

async def get_db():
    global client, db
    if client is None:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client.fitgear
        await init_sample_data()
    return db

async def init_sample_data():
    """Initialize sample data if collections are empty"""
    try:
        if await db.products.count_documents({}) == 0:
            sample_products = [
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Professional Olympic Barbell",
                    "description": "High-quality Olympic barbell perfect for deadlifts, squats, and bench press.",
                    "price": 299.99,
                    "category": "Strength Training",
                    "brand": "FitGear Pro",
                    "images": ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500"],
                    "inventory": 15,
                    "rating": 4.8,
                    "reviews_count": 24,
                    "is_active": True,
                    "created_at": datetime.utcnow()
                },
                {
                    "_id": str(uuid.uuid4()),
                    "name": "Premium Yoga Mat",
                    "description": "Non-slip yoga mat with excellent cushioning and grip.",
                    "price": 49.99,
                    "category": "Fitness Accessories",
                    "brand": "ZenFit",
                    "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500"],
                    "inventory": 25,
                    "rating": 4.7,
                    "reviews_count": 32,
                    "is_active": True,
                    "created_at": datetime.utcnow()
                }
            ]
            await db.products.insert_many(sample_products)
        
        if await db.blog_posts.count_documents({}) == 0:
            sample_posts = [
                {
                    "_id": str(uuid.uuid4()),
                    "title": "10 Essential Exercises for Building Strength",
                    "content": "Discover the fundamental exercises that form the foundation of any strength training program.",
                    "author": "FitGear Team",
                    "category": "Strength Training",
                    "featured_image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
                    "is_published": True,
                    "created_at": datetime.utcnow()
                }
            ]
            await db.blog_posts.insert_many(sample_posts)
    except Exception as e:
        print(f"Error initializing sample data: {e}")

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    try:
        db = await get_db()
        await db.command("ping")
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@app.get("/api/products")
async def get_products(category: Optional[str] = None, limit: int = 50):
    try:
        db = await get_db()
        query = {"is_active": True}
        if category:
            query["category"] = category
        
        products = await db.products.find(query).limit(limit).to_list(length=limit)
        for p in products:
            p["id"] = str(p["_id"])
            if "created_at" in p and hasattr(p["created_at"], 'isoformat'):
                p["created_at"] = p["created_at"].isoformat()
        
        return {"products": products}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/categories")
async def get_categories():
    try:
        db = await get_db()
        categories = await db.products.distinct("category", {"is_active": True})
        return {"categories": sorted(categories)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/blog")
async def get_blog_posts():
    try:
        db = await get_db()
        posts = await db.blog_posts.find({"is_published": True}).to_list(length=100)
        for p in posts:
            p["id"] = str(p["_id"])
            if "created_at" in p and hasattr(p["created_at"], 'isoformat'):
                p["created_at"] = p["created_at"].isoformat()
        
        return {"posts": posts}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))