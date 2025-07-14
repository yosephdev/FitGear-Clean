from mangum import Mangum
import sys
import os

# Add parent directory to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from server import app

# Wrap with Mangum for serverless deployment
handler = Mangum(app)
