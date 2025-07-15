from mangum import Mangum

# Simple test to see if this works
try:
    from main import app
    print("✅ Successfully imported main app")
except Exception as e:
    print(f"❌ Failed to import main app: {e}")
    # Create a fallback simple app
    from fastapi import FastAPI
    app = FastAPI()

    @app.get("/")
    def root():
        return {"message": "Fallback API working", "error": str(e)}

    @app.get("/api/test")
    def test():
        return {"message": "Simple test working", "error": str(e)}

# Wrap with Mangum for serverless deployment
handler = Mangum(app)
