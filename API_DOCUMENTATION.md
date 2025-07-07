# FitGear API Documentation

## Overview

The FitGear API is a RESTful web service that provides comprehensive e-commerce functionality for fitness equipment. Built with FastAPI, it offers high performance, automatic API documentation, and robust data validation.

**Base URL:** `http://localhost:8001` (Development) | `https://api.your-domain.com` (Production)

**API Version:** 1.0.0

## Authentication

The API uses JWT (JSON Web Token) authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Authentication Flow

1. Register a new user or login with existing credentials
2. Receive an access token in the response
3. Include the token in subsequent requests
4. Token expires after 24 hours (1440 minutes)

## API Endpoints

### Health Check

#### GET /api/health
Check the health status of the API and database.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-03-15T10:30:00.000Z",
  "database": "connected",
  "version": "1.0.0"
}
```

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}
```

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one digit

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user": {
    "id": "user-uuid-here",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe"
  }
}
```

#### POST /api/auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user": {
    "id": "user-uuid-here",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false
  }
}
```

#### GET /api/auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "user-uuid-here",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "is_admin": false
}
```

### Product Endpoints

#### GET /api/products
Get a list of products with optional filtering and pagination.

**Query Parameters:**
- `category` (string, optional): Filter by product category
- `search` (string, optional): Search in product name, description, and brand
- `min_price` (float, optional): Minimum price filter
- `max_price` (float, optional): Maximum price filter
- `page` (int, optional, default: 1): Page number for pagination
- `limit` (int, optional, default: 12): Number of products per page (max: 100)

**Example:**
```
GET /api/products?category=Strength Training&min_price=100&max_price=500&page=1&limit=12
```

**Response:**
```json
{
  "products": [
    {
      "id": "product-uuid-here",
      "name": "Professional Olympic Barbell",
      "description": "High-quality Olympic barbell perfect for deadlifts, squats, and bench press.",
      "price": 299.99,
      "category": "Strength Training",
      "brand": "FitGear Pro",
      "images": ["https://example.com/image1.jpg"],
      "inventory": 15,
      "rating": 4.8,
      "reviews_count": 24,
      "specifications": {
        "weight": "20kg",
        "length": "220cm",
        "material": "Steel"
      },
      "is_active": true,
      "created_at": "2024-03-15T10:30:00.000Z"
    }
  ],
  "total": 4,
  "page": 1,
  "limit": 12,
  "total_pages": 1
}
```

#### GET /api/products/{product_id}
Get detailed information about a specific product.

**Response:**
```json
{
  "id": "product-uuid-here",
  "name": "Professional Olympic Barbell",
  "description": "High-quality Olympic barbell perfect for deadlifts, squats, and bench press.",
  "price": 299.99,
  "category": "Strength Training",
  "brand": "FitGear Pro",
  "images": ["https://example.com/image1.jpg"],
  "inventory": 15,
  "rating": 4.8,
  "reviews_count": 24,
  "specifications": {
    "weight": "20kg",
    "length": "220cm",
    "material": "Steel"
  },
  "is_active": true,
  "created_at": "2024-03-15T10:30:00.000Z"
}
```

#### POST /api/products
Create a new product (admin only).

**Headers:**
```
Authorization: Bearer <admin-token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Fitness Equipment",
  "description": "Description of the new equipment",
  "price": 199.99,
  "category": "Cardio",
  "brand": "FitGear",
  "inventory": 10,
  "specifications": {
    "weight": "15kg",
    "dimensions": "100x50x30cm"
  }
}
```

#### GET /api/categories
Get all available product categories.

**Response:**
```json
{
  "categories": [
    "Strength Training",
    "Cardio",
    "Fitness Accessories",
    "Home Gym"
  ]
}
```

### Cart Endpoints

#### GET /api/cart
Get the current user's cart (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "items": [
    {
      "product_id": "product-uuid-here",
      "quantity": 2,
      "price": 299.99,
      "product": {
        "id": "product-uuid-here",
        "name": "Professional Olympic Barbell",
        "images": ["https://example.com/image1.jpg"]
      }
    }
  ],
  "total": 599.98
}
```

#### POST /api/cart/add
Add a product to the cart (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

**Request Body (form data):**
```
product_id=product-uuid-here
quantity=1
```

**Response:**
```json
{
  "message": "Item added to cart successfully"
}
```

#### DELETE /api/cart/remove/{product_id}
Remove a product from the cart (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Item removed from cart successfully"
}
```

### Wishlist Endpoints

#### GET /api/wishlist
Get the current user's wishlist (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "items": [
    {
      "id": "product-uuid-here",
      "name": "Premium Yoga Mat",
      "description": "Non-slip yoga mat with excellent cushioning and grip.",
      "price": 49.99,
      "category": "Fitness Accessories",
      "brand": "ZenFit",
      "images": ["https://example.com/yoga-mat.jpg"],
      "rating": 4.7,
      "reviews_count": 32
    }
  ]
}
```

#### POST /api/wishlist/add
Add a product to the wishlist (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

**Request Body (form data):**
```
product_id=product-uuid-here
```

**Response:**
```json
{
  "message": "Item added to wishlist successfully"
}
```

#### DELETE /api/wishlist/remove/{product_id}
Remove a product from the wishlist (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Item removed from wishlist successfully"
}
```

### Review Endpoints

#### GET /api/products/{product_id}/reviews
Get reviews for a specific product with pagination.

**Query Parameters:**
- `page` (int, optional, default: 1): Page number
- `limit` (int, optional, default: 10): Number of reviews per page (max: 50)

**Response:**
```json
{
  "reviews": [
    {
      "id": "review-uuid-here",
      "product_id": "product-uuid-here",
      "user_id": "user-uuid-here",
      "rating": 5,
      "comment": "Excellent product! Highly recommend.",
      "user_name": "John Doe",
      "created_at": "2024-03-15T10:30:00.000Z"
    }
  ],
  "total": 15,
  "page": 1,
  "limit": 10,
  "total_pages": 2
}
```

#### POST /api/reviews
Add a review for a product (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

**Request Body (form data):**
```
product_id=product-uuid-here
rating=5
comment=This product exceeded my expectations. Great quality and fast delivery.
```

**Validation Rules:**
- Rating must be between 1 and 5
- Comment must be at least 10 characters long
- User can only review each product once

**Response:**
```json
{
  "id": "review-uuid-here",
  "product_id": "product-uuid-here",
  "user_id": "user-uuid-here",
  "rating": 5,
  "comment": "This product exceeded my expectations. Great quality and fast delivery.",
  "user_name": "John Doe",
  "created_at": "2024-03-15T10:30:00.000Z"
}
```

### Order Endpoints

#### GET /api/orders
Get the current user's orders (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (int, optional, default: 1): Page number
- `limit` (int, optional, default: 10): Number of orders per page (max: 50)

**Response:**
```json
{
  "orders": [
    {
      "id": "order-uuid-here",
      "user_id": "user-uuid-here",
      "items": [
        {
          "product_id": "product-uuid-here",
          "quantity": 1,
          "price": 299.99,
          "product": {
            "id": "product-uuid-here",
            "name": "Professional Olympic Barbell",
            "images": ["https://example.com/image1.jpg"]
          }
        }
      ],
      "total": 299.99,
      "status": "completed",
      "payment_intent_id": "pi_1234567890",
      "shipping_address": {},
      "created_at": "2024-03-15T10:30:00.000Z"
    }
  ],
  "total": 5,
  "page": 1,
  "limit": 10,
  "total_pages": 1
}
```

### Payment Endpoints

#### POST /api/payment/create-intent
Create a payment intent for checkout (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

**Request Body (form data):**
```
amount=299.99
```

**Response:**
```json
{
  "client_secret": "pi_1234567890_secret_abcdef",
  "payment_intent_id": "pi_1234567890"
}
```

#### POST /api/payment/confirm
Confirm payment and create order (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

**Request Body (form data):**
```
payment_intent_id=pi_1234567890
```

**Response:**
```json
{
  "order_id": "order-uuid-here",
  "status": "success"
}
```

### Blog Endpoints

#### GET /api/blog
Get blog posts with optional filtering and pagination.

**Query Parameters:**
- `category` (string, optional): Filter by blog category
- `page` (int, optional, default: 1): Page number
- `limit` (int, optional, default: 10): Number of posts per page (max: 50)

**Response:**
```json
{
  "posts": [
    {
      "id": "post-uuid-here",
      "title": "10 Essential Exercises for Building Strength",
      "content": "Discover the fundamental exercises that form the foundation...",
      "author": "FitGear Team",
      "category": "Strength Training",
      "tags": ["strength", "exercises", "beginner"],
      "featured_image": "https://example.com/blog-image.jpg",
      "is_published": true,
      "created_at": "2024-03-15T10:30:00.000Z"
    }
  ],
  "total": 10,
  "page": 1,
  "limit": 10,
  "total_pages": 1
}
```

#### GET /api/blog/{post_id}
Get a specific blog post.

**Response:**
```json
{
  "id": "post-uuid-here",
  "title": "10 Essential Exercises for Building Strength",
  "content": "Discover the fundamental exercises that form the foundation of any strength training program...",
  "author": "FitGear Team",
  "category": "Strength Training",
  "tags": ["strength", "exercises", "beginner"],
  "featured_image": "https://example.com/blog-image.jpg",
  "is_published": true,
  "created_at": "2024-03-15T10:30:00.000Z"
}
```

## Error Handling

The API returns consistent error responses in the following format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error, invalid input)
- `401` - Unauthorized (invalid or missing token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `429` - Too Many Requests (rate limit exceeded)
- `500` - Internal Server Error

### Common Error Messages

- `"Invalid token"` - JWT token is invalid or malformed
- `"Token expired"` - JWT token has expired
- `"Email already registered"` - User with email already exists
- `"Incorrect email or password"` - Login credentials are invalid
- `"Product not found"` - Product with given ID doesn't exist
- `"Insufficient inventory"` - Not enough stock for requested quantity
- `"Admin access required"` - Endpoint requires admin privileges
- `"Rate limit exceeded"` - Too many requests from client IP

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **Default limit:** 100 requests per minute per IP address
- **Admin endpoints:** May have stricter limits
- **Headers included in response:**
  - `X-RateLimit-Limit`: Request limit per time window
  - `X-RateLimit-Remaining`: Remaining requests in current window
  - `X-RateLimit-Reset`: Time when rate limit resets

## Data Validation

### Product Data
- `name`: 1-200 characters, required
- `description`: 10-2000 characters, required
- `price`: Must be greater than 0
- `category`: Non-empty string, required
- `brand`: Non-empty string, required
- `inventory`: Non-negative integer

### User Data
- `email`: Valid email format, unique
- `password`: 8+ characters, must contain uppercase, lowercase, and digit
- `first_name`: 2+ characters, required
- `last_name`: 2+ characters, required

### Review Data
- `rating`: Integer between 1 and 5
- `comment`: 10+ characters, required

## Testing the API

### Using curl

```bash
# Health check
curl http://localhost:8001/api/health

# Register user
curl -X POST http://localhost:8001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!","first_name":"Test","last_name":"User"}'

# Login
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"TestPass123!"}'

# Get products
curl http://localhost:8001/api/products

# Get current user (replace TOKEN with actual token)
curl http://localhost:8001/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Python requests

```python
import requests

# Base URL
base_url = "http://localhost:8001"

# Register user
response = requests.post(f"{base_url}/api/auth/register", json={
    "email": "test@example.com",
    "password": "TestPass123!",
    "first_name": "Test",
    "last_name": "User"
})
token = response.json()["access_token"]

# Get products with authentication
headers = {"Authorization": f"Bearer {token}"}
response = requests.get(f"{base_url}/api/products", headers=headers)
products = response.json()
```

## Interactive API Documentation

The API provides interactive documentation powered by Swagger UI:

- **Development:** http://localhost:8001/api/docs
- **Production:** https://api.your-domain.com/api/docs

Alternative documentation with ReDoc:

- **Development:** http://localhost:8001/api/redoc
- **Production:** https://api.your-domain.com/api/redoc

## Admin Access

To access admin-only endpoints, you need to:

1. Login with admin credentials:
   - Email: `admin@fitgear.com`
   - Password: `admin123`

2. Use the admin token for admin-only endpoints:
   - Creating products
   - Managing orders
   - Accessing user data

## WebSocket Support (Future)

Future versions will include WebSocket support for:
- Real-time inventory updates
- Live order status updates
- Real-time notifications

## API Versioning

The API uses URL versioning:
- Current version: v1 (implicit in `/api/` prefix)
- Future versions: `/api/v2/`, `/api/v3/`, etc.

## Support and Contact

For API support, please contact:
- Email: api-support@fitgear.com
- Documentation: https://docs.fitgear.com
- Status Page: https://status.fitgear.com