"""Seed production MongoDB with sample products if the collection is empty.

Usage:
  MONGO_URL=mongodb://user:pass@host:27017/fitgear python seed_prod_db.py

This script intentionally does not include credentials. Provide the target
MongoDB connection string via the MONGO_URL environment variable. It will
insert sample products from `backend/sample_data.py` only if the `products`
collection is empty.
"""

import asyncio
import os
import sys

from motor.motor_asyncio import AsyncIOMotorClient

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
sys.path.insert(0, ROOT)

from backend.sample_data import sample_products  # noqa: E402


async def seed(mongo_url: str):
    client = AsyncIOMotorClient(mongo_url)
    db = client.get_default_database()
    print(f"Connected to: {mongo_url}")

    count = await db.products.count_documents({})
    print(f"Current product count: {count}")
    if count == 0:
        print("Seeding sample products...")
        await db.products.insert_many(sample_products)
        print(f"Inserted {len(sample_products)} products.")
    else:
        print("Products already exist in the database. No action taken.")

    client.close()


def main():
    mongo_url = os.environ.get("MONGO_URL")
    if not mongo_url:
        print("Error: MONGO_URL environment variable not set.")
        print(
            "Provide it, e.g. MONGO_URL='mongodb://localhost:27017/fitgear' python"
            " seed_prod_db.py"
        )
        sys.exit(1)

    asyncio.run(seed(mongo_url))


if __name__ == "__main__":
    main()
