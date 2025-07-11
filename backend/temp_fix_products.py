import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

async def main():
    """
    Connects to the database and updates all products to ensure they have
    the 'is_active' flag set to True.
    """
    load_dotenv()
    mongo_url = os.getenv("MONGO_URL")

    if not mongo_url:
        print("❌ MONGO_URL not found in .env file. Please make sure it's set.")
        return

    print("Connecting to the database...")
    client = AsyncIOMotorClient(mongo_url)
    db = client.fitgear
    products_collection = db.products

    print("Finding products to update...")
    # Find products where is_active is not True (or doesn't exist)
    result = await products_collection.update_many(
        {"is_active": {"$ne": True}},
        {"$set": {"is_active": True}}
    )

    print(f"✅ Done. {result.modified_count} products were updated.")

if __name__ == "__main__":
    asyncio.run(main())
