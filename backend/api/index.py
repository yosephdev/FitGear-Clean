from fastapi import FastAPI
from mangum import Mangum
import sys
import os

# Add the parent directory to Python path so we can import server.py
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your existing FastAPI app
from server import app

# Wrap with Mangum for serverless deployment
# This is a comment to trigger a change
handler = Mangum(app)
