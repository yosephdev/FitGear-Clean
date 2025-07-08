#!/bin/bash

# FitGear API Test Script
echo "🧪 Testing FitGear API..."
echo ""

BASE_URL="http://localhost:8001"

# Test 1: Health Check
echo "1. Testing Health Check..."
response=$(curl -s "$BASE_URL/api/health")
if [[ $response == *"healthy"* ]]; then
    echo "   ✅ Health check passed"
else
    echo "   ❌ Health check failed"
    echo "   Response: $response"
fi

# Test 2: Root endpoint
echo ""
echo "2. Testing Root Endpoint..."
response=$(curl -s "$BASE_URL/")
if [[ $response == *"FitGear API is running"* ]]; then
    echo "   ✅ Root endpoint working"
else
    echo "   ❌ Root endpoint failed"
fi

# Test 3: Products endpoint
echo ""
echo "3. Testing Products Endpoint..."
response=$(curl -s "$BASE_URL/api/products")
if [[ $response == *"products"* ]]; then
    echo "   ✅ Products endpoint working"
    # Count products
    product_count=$(echo $response | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
    echo "   📦 Total products: $product_count"
else
    echo "   ❌ Products endpoint failed"
fi

# Test 4: Categories endpoint
echo ""
echo "4. Testing Categories Endpoint..."
response=$(curl -s "$BASE_URL/api/categories")
if [[ $response == *"categories"* ]]; then
    echo "   ✅ Categories endpoint working"
else
    echo "   ❌ Categories endpoint failed"
fi

# Test 5: Blog endpoint
echo ""
echo "5. Testing Blog Endpoint..."
response=$(curl -s "$BASE_URL/api/blog")
if [[ $response == *"posts"* ]]; then
    echo "   ✅ Blog endpoint working"
    # Count posts
    post_count=$(echo $response | grep -o '"total":[0-9]*' | grep -o '[0-9]*')
    echo "   📝 Total blog posts: $post_count"
else
    echo "   ❌ Blog endpoint failed"
fi

# Test 6: MongoDB Connection
echo ""
echo "6. Testing MongoDB Connection..."
if sudo docker exec mongodb-fitgear mongosh --eval "db.adminCommand('ping')" --quiet > /dev/null 2>&1; then
    echo "   ✅ MongoDB connection working"
else
    echo "   ❌ MongoDB connection failed"
fi

echo ""
echo "🎉 API Testing Complete!"
echo ""
echo "📍 Useful URLs:"
echo "   API Root: $BASE_URL/"
echo "   API Docs: $BASE_URL/api/docs"
echo "   Health: $BASE_URL/api/health"
echo "   Products: $BASE_URL/api/products"
echo ""
echo "🔧 Management Commands:"
echo "   MongoDB: ./mongodb.sh {start|stop|restart|status|logs|shell}"
echo "   Server: ./start_server.sh"
