
from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "FitGear API is running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "disabled"}

@app.get("/api/products")
async def get_products():
    return {
        "products": [
            {"id": "1", "name": "Test Product 1", "price": 99.99, "category": "fitness"},
            {"id": "2", "name": "Test Product 2", "price": 49.99, "category": "electronics"}
        ]
    }

@app.get("/api/categories")
async def get_categories():
    return {"categories": ["fitness", "electronics", "clothing"]}

# Vercel handler - MUST be last line
handler = Mangum(app)
