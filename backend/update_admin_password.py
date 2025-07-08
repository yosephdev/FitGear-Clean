#!/usr/bin/env python3
"""
Script to update admin password in the database
"""
import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

async def update_admin_password():
    """Update admin password in the database"""
    try:
        # Connect to MongoDB
        mongo_url = os.getenv("MONGO_URL", "mongodb://localhost:27017/fitgear")
        client = AsyncIOMotorClient(mongo_url)
        db = client.fitgear
        
        # Update admin password
        new_password_hash = get_password_hash("FitGear2025!Admin")
        
        result = await db.users.update_one(
            {"email": "admin@fitgear.com"},
            {"$set": {"password": new_password_hash}}
        )
        
        if result.modified_count > 0:
            print("✅ Admin password updated successfully")
        else:
            print("❌ Admin user not found or password not updated")
            
    except Exception as e:
        print(f"❌ Error updating admin password: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(update_admin_password())
