"""
Vercel Python entrypoint.

Expose an ASGI `app` object so Vercel's Python runtime can serve the FastAPI
application. We try to import the real app from `api.main` (packaged layout) or
`main`. If both fail, fall back to a minimal FastAPI app so the function still
responds and prints useful diagnostics.
"""

import traceback

app = None
last_error = None

for attempt in ("api.main", "main"):
    try:
        module = __import__(attempt, fromlist=["app"])
        app = getattr(module, "app")
        print(f"✅ Successfully imported app from '{attempt}'")
        break
    except Exception as e:
        last_error = e
        print(f"❌ Import from '{attempt}' failed: {e}")
        traceback.print_exc()

if app is None:
    # Create a minimal fallback app so the function doesn't crash on import.
    from fastapi import FastAPI

    app = FastAPI()

    @app.get("/")
    def root():
        return {"message": "Fallback API working", "error": str(last_error)}

    @app.get("/api/test")
    def test():
        return {"message": "Simple test working", "error": str(last_error)}

# Note: do NOT wrap the app with Mangum here. Vercel's Python runtime expects an
# ASGI app object named `app` in the module namespace. Wrapping with Mangum can
# confuse Vercel's runtime detection and cause the "issubclass() arg 1 must be a
# class" TypeError.
