import requests
import unittest
import json
import uuid
import time
import os
from datetime import datetime

class FitGearAPITest(unittest.TestCase):
    """Test suite for FitGear API endpoints"""
    
    @classmethod
    def setUpClass(cls):
        """Set up test environment before running tests"""
        # Get configuration from environment variables
        cls.base_url = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001")
        cls.admin_email = os.environ.get("TEST_ADMIN_EMAIL")
        cls.admin_password = os.environ.get("TEST_ADMIN_PASSWORD")
        
        # Ensure required environment variables are set
        if not cls.admin_email or not cls.admin_password:
            raise EnvironmentError(
                "TEST_ADMIN_EMAIL and TEST_ADMIN_PASSWORD environment variables must be set"
            )
            
        # Generate unique test user credentials
        cls.test_user_email = f"test_user_{int(time.time())}@example.com"
        cls.test_user_password = f"TestPass{uuid.uuid4().hex[:8]}!"
        cls.test_user_first_name = "Test"
        cls.test_user_last_name = "User"
        cls.admin_token = None
        cls.user_token = None
        cls.user_id = None
        cls.test_product_id = None
        
        # Admin login
        cls.admin_login()
        
        # Register test user
        cls.register_test_user()
        
        print(f"\n{'='*50}")
        print(f"Testing FitGear API at: {cls.base_url}")
        print(f"{'='*50}\n")

    @classmethod
    def admin_login(cls):
        """Login as admin and get token"""
        response = requests.post(
            f"{cls.base_url}/api/auth/login",
            json={"email": cls.admin_email, "password": cls.admin_password}
        )
        if response.status_code == 200:
            data = response.json()
            cls.admin_token = data.get("access_token")
            print(f"✅ Admin login successful")
        else:
            print(f"❌ Admin login failed: {response.status_code} - {response.text}")
    
    @classmethod
    def register_test_user(cls):
        """Register a test user"""
        response = requests.post(
            f"{cls.base_url}/api/auth/register",
            json={
                "email": cls.test_user_email,
                "password": cls.test_user_password,
                "first_name": cls.test_user_first_name,
                "last_name": cls.test_user_last_name
            }
        )
        if response.status_code == 200:
            data = response.json()
            cls.user_token = data.get("access_token")
            cls.user_id = data.get("user", {}).get("id")
            print(f"✅ Test user registration successful: {cls.test_user_email}")
        else:
            # Try login if registration fails (user might already exist)
            cls.user_login()
    
    @classmethod
    def user_login(cls):
        """Login as test user"""
        response = requests.post(
            f"{cls.base_url}/api/auth/login",
            json={"email": cls.test_user_email, "password": cls.test_user_password}
        )
        if response.status_code == 200:
            data = response.json()
            cls.user_token = data.get("access_token")
            cls.user_id = data.get("user", {}).get("id")
            print(f"✅ Test user login successful: {cls.test_user_email}")
        else:
            print(f"❌ Test user login failed: {response.status_code} - {response.text}")
    
    def get_auth_headers(self, admin=False):
        """Get authentication headers"""
        token = self.admin_token if admin else self.user_token
        return {"Authorization": f"Bearer {token}"}
    
    def test_01_health_check(self):
        """Test health check endpoint"""
        print("\n🔍 Testing health check endpoint...")
        response = requests.get(f"{self.base_url}/api/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "healthy")
        print("✅ Health check endpoint working")
    
    def test_02_get_current_user(self):
        """Test get current user endpoint"""
        print("\n🔍 Testing get current user endpoint...")
        response = requests.get(
            f"{self.base_url}/api/auth/me",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("email"), self.test_user_email)
        print("✅ Get current user endpoint working")
    
    def test_03_get_products(self):
        """Test get products endpoint"""
        print("\n🔍 Testing get products endpoint...")
        response = requests.get(f"{self.base_url}/api/products")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("products", data)
        self.assertIn("total", data)
        
        # Save a product ID for later tests
        if data.get("products") and len(data.get("products")) > 0:
            self.__class__.test_product_id = data.get("products")[0].get("id")
            print(f"✅ Get products endpoint working (found {data.get('total')} products)")
        else:
            print("⚠️ Get products endpoint working but no products found")
    
    def test_04_get_product_detail(self):
        """Test get product detail endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing get product detail endpoint for product {self.__class__.test_product_id}...")
        response = requests.get(f"{self.base_url}/api/products/{self.__class__.test_product_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("id"), self.__class__.test_product_id)
        print("✅ Get product detail endpoint working")
    
    def test_05_get_categories(self):
        """Test get categories endpoint"""
        print("\n🔍 Testing get categories endpoint...")
        response = requests.get(f"{self.base_url}/api/categories")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("categories", data)
        print(f"✅ Get categories endpoint working (found {len(data.get('categories'))} categories)")
    
    def test_06_add_to_cart(self):
        """Test add to cart endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing add to cart endpoint for product {self.__class__.test_product_id}...")
        response = requests.post(
            f"{self.base_url}/api/cart/add",
            headers=self.get_auth_headers(),
            data={"product_id": self.__class__.test_product_id, "quantity": 1}
        )
        self.assertEqual(response.status_code, 200)
        print("✅ Add to cart endpoint working")
    
    def test_07_get_cart(self):
        """Test get cart endpoint"""
        print("\n🔍 Testing get cart endpoint...")
        response = requests.get(
            f"{self.base_url}/api/cart",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)
        self.assertIn("total", data)
        print(f"✅ Get cart endpoint working (found {len(data.get('items'))} items)")
    
    def test_08_add_to_wishlist(self):
        """Test add to wishlist endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing add to wishlist endpoint for product {self.__class__.test_product_id}...")
        response = requests.post(
            f"{self.base_url}/api/wishlist/add",
            headers=self.get_auth_headers(),
            data={"product_id": self.__class__.test_product_id}
        )
        self.assertEqual(response.status_code, 200)
        print("✅ Add to wishlist endpoint working")
    
    def test_09_get_wishlist(self):
        """Test get wishlist endpoint"""
        print("\n🔍 Testing get wishlist endpoint...")
        response = requests.get(
            f"{self.base_url}/api/wishlist",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("items", data)
        print(f"✅ Get wishlist endpoint working (found {len(data.get('items'))} items)")
    
    def test_10_add_review(self):
        """Test add review endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing add review endpoint for product {self.__class__.test_product_id}...")
        response = requests.post(
            f"{self.base_url}/api/reviews",
            headers=self.get_auth_headers(),
            data={
                "product_id": self.__class__.test_product_id,
                "rating": 5,
                "comment": "This is a test review from automated testing. The product is excellent!"
            }
        )
        # Note: This might fail if the user has already reviewed this product
        if response.status_code == 200:
            print("✅ Add review endpoint working")
        elif response.status_code == 400 and "already reviewed" in response.text.lower():
            print("⚠️ Add review endpoint working but user has already reviewed this product")
        else:
            self.assertEqual(response.status_code, 200, f"Failed with: {response.text}")
    
    def test_11_get_product_reviews(self):
        """Test get product reviews endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing get product reviews endpoint for product {self.__class__.test_product_id}...")
        response = requests.get(f"{self.base_url}/api/products/{self.__class__.test_product_id}/reviews")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("reviews", data)
        print(f"✅ Get product reviews endpoint working (found {len(data.get('reviews'))} reviews)")
    
    def test_12_get_blog_posts(self):
        """Test get blog posts endpoint"""
        print("\n🔍 Testing get blog posts endpoint...")
        response = requests.get(f"{self.base_url}/api/blog")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("posts", data)
        
        # Save a blog post ID for later tests
        self.blog_post_id = None
        if data.get("posts") and len(data.get("posts")) > 0:
            self.blog_post_id = data.get("posts")[0].get("id")
            print(f"✅ Get blog posts endpoint working (found {data.get('total')} posts)")
        else:
            print("⚠️ Get blog posts endpoint working but no posts found")
    
    def test_13_get_blog_post_detail(self):
        """Test get blog post detail endpoint"""
        if not hasattr(self, 'blog_post_id') or not self.blog_post_id:
            self.skipTest("No blog post ID available for testing")
        
        print(f"\n🔍 Testing get blog post detail endpoint for post {self.blog_post_id}...")
        response = requests.get(f"{self.base_url}/api/blog/{self.blog_post_id}")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("id"), self.blog_post_id)
        print("✅ Get blog post detail endpoint working")
    
    def test_14_remove_from_cart(self):
        """Test remove from cart endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing remove from cart endpoint for product {self.__class__.test_product_id}...")
        response = requests.delete(
            f"{self.base_url}/api/cart/remove/{self.__class__.test_product_id}",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        print("✅ Remove from cart endpoint working")
    
    def test_15_remove_from_wishlist(self):
        """Test remove from wishlist endpoint"""
        if not self.__class__.test_product_id:
            self.skipTest("No product ID available for testing")
        
        print(f"\n🔍 Testing remove from wishlist endpoint for product {self.__class__.test_product_id}...")
        response = requests.delete(
            f"{self.base_url}/api/wishlist/remove/{self.__class__.test_product_id}",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        print("✅ Remove from wishlist endpoint working")
    
    def test_16_get_orders(self):
        """Test get orders endpoint"""
        print("\n🔍 Testing get orders endpoint...")
        response = requests.get(
            f"{self.base_url}/api/orders",
            headers=self.get_auth_headers()
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("orders", data)
        print(f"✅ Get orders endpoint working (found {len(data.get('orders'))} orders)")
    
    def test_17_create_payment_intent(self):
        """Test create payment intent endpoint"""
        print("\n🔍 Testing create payment intent endpoint...")
        # Add a product to cart first
        if self.__class__.test_product_id:
            requests.post(
                f"{self.base_url}/api/cart/add",
                headers=self.get_auth_headers(),
                data={"product_id": self.__class__.test_product_id, "quantity": 1}
            )
        
        response = requests.post(
            f"{self.base_url}/api/payment/create-intent",
            headers=self.get_auth_headers(),
            data={"amount": 100.00}  # $100.00
        )
        
        # This might fail if Stripe is not properly configured
        if response.status_code == 200:
            print("✅ Create payment intent endpoint working")
        elif "not configured" in response.text.lower():
            print("⚠️ Create payment intent endpoint not working - Stripe not configured")
        else:
            self.assertEqual(response.status_code, 200, f"Failed with: {response.text}")
    
    def test_18_admin_access(self):
        """Test admin-only access"""
        print("\n🔍 Testing admin-only access...")
        # Try to create a product as regular user (should fail)
        response_user = requests.post(
            f"{self.base_url}/api/products",
            headers=self.get_auth_headers(admin=False),
            json={
                "name": "Test Product",
                "description": "This is a test product",
                "price": 99.99,
                "category": "Test Category",
                "brand": "Test Brand",
                "inventory": 10
            }
        )
        self.assertEqual(response_user.status_code, 403)
        
        # Try to create a product as admin (should succeed)
        response_admin = requests.post(
            f"{self.base_url}/api/products",
            headers=self.get_auth_headers(admin=True),
            json={
                "name": "Test Product",
                "description": "This is a test product",
                "price": 99.99,
                "category": "Test Category",
                "brand": "Test Brand",
                "inventory": 10
            }
        )
        self.assertEqual(response_admin.status_code, 200)
        print("✅ Admin-only access working correctly")

if __name__ == "__main__":
    # Run tests in order
    unittest.main(verbosity=2)