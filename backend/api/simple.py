from fastapi import FastAPI
from mangum import Mangum
import os
from datetime import datetime, timezone

# Create a simple app
app = FastAPI()

@app.get("/")
def root():
    return {
        "message": "Simple API is working!",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": os.environ.get("VERCEL_ENV", "unknown")
    }

@app.get("/api")
def api_root():
    return {
        "message": "Simple API is working!",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": os.environ.get("VERCEL_ENV", "unknown")
    }

@app.get("/api/test")
def test():
    return {
        "message": "Simple test endpoint is working!",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "environment": os.environ.get("VERCEL_ENV", "unknown"),
        "env_vars": {k: "***" for k in os.environ.keys()}
    }

# Wrap with Mangum for serverless deployment
handler = Mangum(app)
