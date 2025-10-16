#!/usr/bin/env python3
"""
Script to completely reset the MongoDB database with only products that have local images.
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from sample_data import sample_products, sample_posts

load_dotenv()

async def reset_database():
    # Connect to MongoDB
    mongo_url = os.getenv('MONGO_URL')  # Changed from MONGO_URI to MONGO_URL
    if not mongo_url:
        print("❌ MONGO_URL not found in environment variables")
        return
    
    client = AsyncIOMotorClient(mongo_url)
    db = client.fitgear  # Use the fitgear database explicitly
    
    try:
        print("🗑️  Dropping existing collections...")
        await db.products.drop()
        await db.posts.drop()
        print("✅ Collections dropped")
        
        print(f"📦 Inserting {len(sample_products)} products...")
        if sample_products:
            await db.products.insert_many(sample_products)
        print("✅ Products inserted")
        
        print(f"📝 Inserting {len(sample_posts)} blog posts...")
        if sample_posts:
            await db.posts.insert_many(sample_posts)
        print("✅ Blog posts inserted")
        
        print("\n✅ Database reset complete!")
        print(f"   Products in database: {len(sample_products)}")
        
    except Exception as e:
        print(f"❌ Error resetting database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(reset_database())
