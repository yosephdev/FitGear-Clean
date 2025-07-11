from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your existing app
from server import app

# This is the handler Vercel will use
def handler(request, response):
    return app(request, response)

# Export for Vercel
app = app
