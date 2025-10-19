from http.server import BaseHTTPRequestHandler
import json
import os

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/products':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            products = [
                {
                    "product_id": "1",
                    "name": "Premium Yoga Mat",
                    "price": 49.99,
                    "description": "High-quality non-slip yoga mat for all your fitness needs",
                    "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"],
                    "category": "yoga",
                    "slug": "premium-yoga-mat",
                    "stock": 50,
                    "featured": True
                },
                {
                    "product_id": "2",
                    "name": "Adjustable Dumbbells",
                    "price": 129.99,
                    "description": "Space-saving adjustable dumbbell set for home workouts",
                    "images": ["https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400"],
                    "category": "weights", 
                    "slug": "adjustable-dumbbells",
                    "stock": 25,
                    "featured": True
                },
                {
                    "product_id": "3",
                    "name": "Resistance Bands Set",
                    "price": 24.99,
                    "description": "Set of 5 resistance bands for strength training",
                    "images": ["https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400"],
                    "category": "accessories",
                    "slug": "resistance-bands-set", 
                    "stock": 100,
                    "featured": False
                }
            ]
            
            self.wfile.write(json.dumps(products).encode('utf-8'))
            return
            
        elif self.path.startswith('/api/products/'):
            slug = self.path.split('/')[-1]
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            products = [
                {
                    "product_id": "1",
                    "name": "Premium Yoga Mat", 
                    "price": 49.99,
                    "description": "High-quality non-slip yoga mat for all your fitness needs",
                    "images": ["https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400"],
                    "category": "yoga",
                    "slug": "premium-yoga-mat",
                    "stock": 50,
                    "featured": True
                },
                {
                    "product_id": "2",
                    "name": "Adjustable Dumbbells",
                    "price": 129.99, 
                    "description": "Space-saving adjustable dumbbell set for home workouts",
                    "images": ["https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400"],
                    "category": "weights",
                    "slug": "adjustable-dumbbells",
                    "stock": 25,
                    "featured": True
                },
                {
                    "product_id": "3", 
                    "name": "Resistance Bands Set",
                    "price": 24.99,
                    "description": "Set of 5 resistance bands for strength training",
                    "images": ["https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400"],
                    "category": "accessories",
                    "slug": "resistance-bands-set",
                    "stock": 100,
                    "featured": False
                }
            ]
            
            product = next((p for p in products if p["slug"] == slug), None)
            if product:
                self.wfile.write(json.dumps(product).encode('utf-8'))
            else:
                self.wfile.write(json.dumps({"error": "Product not found"}).encode('utf-8'))
            return
            
        elif self.path == '/api/health':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "healthy", "message": "API is working!"}).encode('utf-8'))
            return
            
        else:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"message": "FitGear API is running!"}).encode('utf-8'))