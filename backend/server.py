from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://frontend-iota-seven-68.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "FitGear API is running on Vercel!"}


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "disabled"}


@app.get("/api/products")
async def get_products():
    return {
        "products": [
            {
                "id": "1",
                "name": "Fitness Tracker",
                "price": 99.99,
                "category": "electronics",
                "image": "/images/fitness-tracker.jpg",
            },
            {
                "id": "2",
                "name": "Yoga Mat",
                "price": 29.99,
                "category": "fitness",
                "image": "/images/yoga-mat.jpg",
            },
        ]
    }


@app.get("/api/categories")
async def get_categories():
    return {"categories": ["electronics", "fitness", "clothing"]}


handler = Mangum(app)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
