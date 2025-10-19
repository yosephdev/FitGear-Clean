#!/usr/bin/env python3
"""
Simple script to update product images in the database.
"""

import os
import sys

from dotenv import load_dotenv
from pymongo import MongoClient

from sample_data import sample_products

load_dotenv()


def update_product_images():
    # Connect to MongoDB
    mongo_url = os.getenv("MONGO_URL")
    if not mongo_url:
        print("❌ MONGO_URL not found in environment variables")
        return False

    try:
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
        db = client.fitgear

        print("🔄 Updating product images...")

        # Drop and recreate products collection
        db.products.drop()
        print("✅ Dropped old products")

        # Insert new products with updated images
        if sample_products:
            result = db.products.insert_many(sample_products)
            print(
                f"✅ Inserted {len(result.inserted_ids)} products with updated images"
            )

        # Verify
        count = db.products.count_documents({})
        print(f"📦 Total products in database: {count}")

        # Show some sample image paths
        print("\n📸 Sample image paths:")
        for product in db.products.find().limit(3):
            print(f"   - {product['name']}: {product['images'][0]}")

        client.close()
        return True

    except Exception as e:
        print(f"❌ Error updating database: {e}")
        return False


if __name__ == "__main__":
    success = update_product_images()
    sys.exit(0 if success else 1)
