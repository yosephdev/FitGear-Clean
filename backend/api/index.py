from mangum import Mangum
from main import app

# Wrap with Mangum for serverless deployment
handler = Mangum(app)
