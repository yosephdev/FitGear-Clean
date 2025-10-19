#!/usr/bin/env python3
"""
Quick script to drop products collection so it gets recreated on server restart
"""

import os
import sys

# Try pymongo first
try:
    from pymongo import MongoClient

    use_pymongo = True
except ImportError:
    use_pymongo = False

# Try motor if pymongo not available
if not use_pymongo:
    try:
        import asyncio

        from motor.motor_asyncio import AsyncIOMotorClient

        use_motor = True
    except ImportError:
        use_motor = False
else:
    use_motor = False

from dotenv import load_dotenv

load_dotenv()


def drop_with_pymongo():
    mongo_url = os.getenv("MONGO_URL")
    if not mongo_url:
        print("❌ MONGO_URL not found")
        return False

    try:
        client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
        db = client.fitgear
        db.products.drop()
        print("✅ Products collection dropped (using pymongo)")
        client.close()
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


async def drop_with_motor():
    mongo_url = os.getenv("MONGO_URL")
    if not mongo_url:
        print("❌ MONGO_URL not found")
        return False

    try:
        client = AsyncIOMotorClient(mongo_url)
        db = client.fitgear
        await db.products.drop()
        print("✅ Products collection dropped (using motor)")
        client.close()
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


if __name__ == "__main__":
    if use_pymongo:
        success = drop_with_pymongo()
    elif use_motor:
        success = asyncio.run(drop_with_motor())
    else:
        print("❌ Neither pymongo nor motor is installed")
        print("💡 Trying manual MongoDB shell command...")
        mongo_url = os.getenv("MONGO_URL")
        if mongo_url:
            print("\nRun this command manually:")
            print(f'mongosh "{mongo_url}" --eval "use fitgear; db.products.drop();"')
        success = False

    sys.exit(0 if success else 1)
