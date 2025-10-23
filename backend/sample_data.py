import uuid
from datetime import datetime, timezone

sample_products = [
    {
        "_id": str(uuid.uuid4()),
        "name": "Speed Jump Rope",
        "description": (
            "Lightweight and durable jump rope for high-intensity cardio workouts."
        ),
        "price": 24.99,
        "category": "Fitness Accessories",
        "brand": "FlexFit",
        "images": ["/smart-jump-rope.jpg"],
        "inventory": 100,
        "rating": 4.7,
        "reviews_count": 85,
        "specifications": {"length": "10ft", "material": "Wire cable"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Adjustable Dumbbells Set",
        "description": (
            "Complete adjustable dumbbell set with multiple weight plates."
        ),
        "price": 199.99,
        "category": "Strength Training",
        "brand": "FitGear Home",
        "images": ["/adjustable-dumbbells.jpg"],
        "inventory": 8,
        "rating": 4.6,
        "reviews_count": 18,
        "specifications": {"weight_range": "5-50lbs", "material": "Cast Iron"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Premium Yoga Mat",
        "description": "Non-slip yoga mat with excellent cushioning and grip.",
        "price": 49.99,
        "category": "Fitness Accessories",
        "brand": "ZenFit",
        "images": ["/premium-yoga-mat.png"],
        "inventory": 25,
        "rating": 4.7,
        "reviews_count": 32,
        "specifications": {"thickness": "6mm", "material": "Natural Rubber"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Resistance Bands Set",
        "description": (
            "Complete set of resistance bands with different resistance levels."
        ),
        "price": 29.99,
        "category": "Fitness Accessories",
        "brand": "FlexFit",
        "images": ["/resistance-bands-exercise.png"],
        "inventory": 30,
        "rating": 4.5,
        "reviews_count": 15,
        "specifications": {
            "resistance_levels": "Light, Medium, Heavy",
            "material": "Latex",
        },
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Smart Treadmill",
        "description": (
            "Interactive treadmill with a large touch screen and virtual running"
            " trails."
        ),
        "price": 1299.99,
        "category": "Cardio Equipment",
        "brand": "CardioMax",
        "images": ["/smart-treadmill.jpg"],
        "inventory": 10,
        "rating": 4.9,
        "reviews_count": 38,
        "specifications": {
            "speed": "0-12 mph",
            "incline": "0-15%",
            "screen": "22-inch HD",
        },
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Peloton-Style Bike",
        "description": (
            "High-energy indoor cycling bike with live and on-demand classes."
        ),
        "price": 999.99,
        "category": "Cardio Equipment",
        "brand": "CycleFit",
        "images": ["/peloton-style-bike.jpg"],
        "inventory": 12,
        "rating": 4.8,
        "reviews_count": 52,
        "specifications": {"resistance": "Magnetic", "screen": "24-inch HD"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Pro Kettlebell",
        "description": (
            "Competition-grade kettlebell for building strength and endurance."
        ),
        "price": 79.99,
        "category": "Fitness Accessories",
        "brand": "KettlePro",
        "images": ["/kettlebell-set.jpg"],
        "inventory": 40,
        "rating": 4.9,
        "reviews_count": 60,
        "specifications": {"weight": "16kg", "material": "Cast Iron"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Men's Workout Tank",
        "description": (
            "Moisture-wicking and breathable tank top for maximum comfort during"
            " workouts."
        ),
        "price": 34.99,
        "category": "Apparel",
        "brand": "FitGear Wear",
        "images": ["/mens-workout-tank.jpg"],
        "inventory": 75,
        "rating": 4.6,
        "reviews_count": 42,
        "specifications": {"material": "Polyester/Spandex Blend"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Women's Yoga Pants",
        "description": (
            "High-waisted and squat-proof yoga pants for ultimate flexibility and"
            " support."
        ),
        "price": 59.99,
        "category": "Apparel",
        "brand": "ZenFit",
        "images": ["/smart-jump-rope.jpg"],
        "inventory": 60,
        "rating": 4.8,
        "reviews_count": 95,
        "specifications": {"material": "Nylon/Spandex Blend"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "name": "Foam Roller Pro",
        "description": (
            "High-density foam roller for deep tissue massage and muscle recovery."
        ),
        "price": 34.99,
        "category": "Fitness Accessories",
        "brand": "RecoverFit",
        "images": ["/foam-roller.jpg"],
        "inventory": 45,
        "rating": 4.7,
        "reviews_count": 78,
        "specifications": {"length": "36 inches", "density": "High"},
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    },
]

sample_posts = [
    {
        "_id": str(uuid.uuid4()),
        "title": "10 Essential Exercises for Building Strength",
        "content": (
            "Discover the fundamental exercises that form the foundation of any"
            " strength training program..."
        ),
        "author": "FitGear Team",
        "category": "Strength Training",
        "tags": ["strength", "exercises", "beginner"],
        "featured_image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
        "is_published": True,
        "created_at": datetime.now(timezone.utc),
    },
    {
        "_id": str(uuid.uuid4()),
        "title": "Home Gym Setup: Essential Equipment",
        "content": (
            "Learn how to set up an effective home gym with the right equipment and"
            " limited space..."
        ),
        "author": "FitGear Team",
        "category": "Home Gym",
        "tags": ["home gym", "equipment", "setup"],
        "featured_image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
        "is_published": True,
        "created_at": datetime.now(timezone.utc),
    },
]
