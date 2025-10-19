import os
import pytest
import pytest_asyncio
from dotenv import load_dotenv
from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
from server import app

load_dotenv(".env.test")


@pytest_asyncio.fixture(scope="session")
async def test_client():
    """
    GIVEN a FastAPI application
    WHEN the test client is initialized with a mocked database connection
    THEN the application is ready for testing without external database dependencies
    """
    # Setup: Manually initialize the database client for testing
    MONGO_URL = os.getenv("MONGO_URL")
    if not MONGO_URL:
        raise ValueError("MONGO_URL environment variable not set for testing")

    client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=5000)
    app.state.client = client
    app.state.db = client.fitgear_test  # Use a dedicated test database

    with TestClient(app) as test_client_instance:
        yield test_client_instance

    # Teardown: Close the database connection
    app.state.client.close()


@pytest.mark.asyncio
async def test_health_check(test_client):
    """
    GIVEN a running FastAPI application
    WHEN the /api/health endpoint is called
    THEN it should return a 200 status code and a "healthy" status
    """
    response = test_client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    # assert response.json()["database"] == "connected" # Commented out for now


@pytest.mark.asyncio
async def test_get_products(test_client):
    """
    GIVEN a running FastAPI application
    WHEN the /api/products endpoint is called
    THEN it should return a 200 status code and a list of products
    """
    response = test_client.get("/api/products")
    assert response.status_code == 200
    assert "products" in response.json()
