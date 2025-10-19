from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os

app = FastAPI(title="FitGear API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sample products data
products = [
    {
        "product_id": "1",
        "name": "Premium Yoga Mat",
        "price": 49.99,
        "description": "High-quality non-slip yoga mat for all your fitness needs",
        "images": ["https://via.placeholder.com/400x400?text=Yoga+Mat"],
        "category": "yoga",
        "slug": "premium-yoga-mat",
        "stock": 50,
        "featured": True
    },
    {
        "product_id": "2", 
        "name": "Adjustable Dumbbells",
        "price": 129.99,
        "description": "Space-saving adjustable dumbbell set for home workouts",
        "images": ["https://via.placeholder.com/400x400?text=Dumbbells"],
        "category": "weights",
        "slug": "adjustable-dumbbells",
        "stock": 25,
        "featured": True
    },
    {
        "product_id": "3",
        "name": "Resistance Bands Set",
        "price": 24.99,
        "description": "Set of 5 resistance bands for strength training and physical therapy",
        "images": ["https://via.placeholder.com/400x400?text=Resistance+Bands"],
        "category": "accessories",
        "slug": "resistance-bands-set",
        "stock": 100,
        "featured": False
    }
]

@app.get("/")
async def root():
    return {"message": "FitGear API is running!"}

@app.get("/api/products")
async def get_products():
    return JSONResponse(content=products)

@app.get("/api/products/{slug}")
async def get_product(slug: str):
    product = next((p for p in products if p["slug"] == slug), None)
    if product:
        return JSONResponse(content=product)
    return JSONResponse(content={"error": "Product not found"}, status_code=404)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "API is working!"}

# For Vercel deployment
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)