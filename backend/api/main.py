from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os
from datetime import datetime, timezone
import uuid

# Environment variables
MONGO_URL = os.getenv("MONGO_URL")
print(f"🔍 MONGO_URL set: {'Yes' if MONGO_URL else 'No'}")
# Don't raise error here, handle it in get_db() function

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
        try:
            if not MONGO_URL:
                print("❌ MONGO_URL not set")
                raise ValueError("MONGO_URL environment variable not set")

            print(f"🔄 Connecting to MongoDB...")
            client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
            db = client.fitgear
            # Test the connection
            await client.admin.command('ping')
            print("✅ Connected to MongoDB")
            await init_sample_data()
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            raise
    return db

async def init_sample_data():
    """Initialize sample data if collections are empty"""
    try:
        products_count = await db.products.count_documents({})
        if products_count == 0:
            print("No products found, creating sample products...")
            from sample_data import sample_products
            await db.products.insert_many(sample_products)
            print(f"✅ {len(sample_products)} sample products created.")
        else:
            print(f"✅ Found {products_count} existing products")

        posts_count = await db.blog_posts.count_documents({})
        if posts_count == 0:
            print("No blog posts found, creating sample posts...")
            from sample_data import sample_posts
            await db.blog_posts.insert_many(sample_posts)
            print(f"✅ {len(sample_posts)} sample blog posts created.")
        else:
            print(f"✅ Found {posts_count} existing blog posts")
    except Exception as e:
        print(f"❌ Error initializing sample data: {e}")
        raise

@app.get("/")
async def root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}

@app.get("/api")
async def api_root():
    return {"message": "FitGear API is running!", "version": "1.0.0"}

@app.get("/api/test")
async def test_endpoint():
    """Simple test endpoint that doesn't require database"""
    return {
        "status": "success",
        "message": "API is working!",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": os.getenv("VERCEL_ENV", "unknown")
    }

@app.get("/api/health")
async def health_check():
    try:
        db = await get_db()
        await db.command("ping")
        return {"status": "healthy", "database": "connected", "timestamp": datetime.now(timezone.utc).isoformat()}
    except Exception as e:
        print(f"Health check error: {e}")
        return {"status": "error", "message": str(e), "timestamp": datetime.now(timezone.utc).isoformat()}

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