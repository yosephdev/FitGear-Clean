from fastapi import FastAPI
from mangum import Mangum

# Create a simple app
app = FastAPI()

@app.get("/")
def root():
    return {"message": "Simple API is working!", "status": "ok"}

@app.get("/api")
def api_root():
    return {"message": "Simple API is working!", "status": "ok"}

@app.get("/api/test")
def test():
    return {"message": "Simple test endpoint is working!", "status": "ok"}

@app.get("/api/health")
def health():
    return {"status": "healthy", "message": "API is running"}

# Wrap with Mangum for serverless deployment
handler = Mangum(app)
