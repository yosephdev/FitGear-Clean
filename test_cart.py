#!/usr/bin/env python3
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get credentials from environment variables
login_data = {
    'email': os.getenv('TEST_ADMIN_EMAIL', 'admin@fitgear.com'),
    'password': os.getenv('TEST_ADMIN_PASSWORD')
}

if not login_data['password']:
    raise EnvironmentError("TEST_ADMIN_PASSWORD environment variable must be set")

# Login first
login_response = requests.post('http://localhost:8001/api/auth/login', json=login_data)

if login_response.status_code == 200:
    token = login_response.json()['access_token']
    print('✅ Login successful')
    
    # Get product ID
    products_response = requests.get('http://localhost:8001/api/products')
    product_id = products_response.json()['products'][0]['id']
    print(f'Using product ID: {product_id}')
    
    # Test cart add
    headers = {'Authorization': f'Bearer {token}'}
    form_data = {'product_id': product_id, 'quantity': '1'}
    cart_response = requests.post('http://localhost:8001/api/cart/add', headers=headers, data=form_data)
    
    print(f'Cart add status: {cart_response.status_code}')
    if cart_response.status_code == 200:
        print('✅ Cart add successful')
        print('Response:', cart_response.json())
    else:
        print('❌ Cart add failed')
        print('Error:', cart_response.text)
        
    # Check cart contents
    cart_get_response = requests.get('http://localhost:8001/api/cart', headers=headers)
    print(f'Cart get status: {cart_get_response.status_code}')
    if cart_get_response.status_code == 200:
        cart_data = cart_get_response.json()
        print(f'Cart items: {len(cart_data.get("items", []))}')
        print(f'Cart total: ${cart_data.get("total", 0)}')
else:
    print('❌ Login failed:', login_response.status_code, login_response.text)
