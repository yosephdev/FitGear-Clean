# FitGear Backend

This is the backend API for the FitGear e-commerce application, built with FastAPI and MongoDB.

## 🚀 Quick Start

### 1. Environment Setup
The Python virtual environment is already configured. All required packages are installed.

### 2. Environment Variables
Copy the example environment file and configure it:
```bash
cp .env.example .env
```

Edit `.env` with your actual configuration:
- `MONGO_URL`: MongoDB connection string
- `SECRET_KEY`: JWT secret key (generate a strong random key)
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- Other configurations as needed

### 3. Install and Start MongoDB
MongoDB is now running in Docker for better compatibility:

```bash
# MongoDB is automatically started with the server
./start_server.sh

# Or manage MongoDB manually:
./mongodb.sh start    # Start MongoDB
./mongodb.sh stop     # Stop MongoDB
./mongodb.sh status   # Check status
./mongodb.sh logs     # View logs
./mongodb.sh shell    # Open MongoDB shell
```

**Note**: MongoDB runs in a Docker container and data is persisted in a Docker volume named `mongodb_data`.

### 4. Start the Server
```bash
# Using the start script
./start_server.sh

# Or manually
/home/yoseph/fit-gear/.venv/bin/python server.py
```

## 📚 API Documentation

Once the server is running, you can access:
- **API Documentation**: http://localhost:8001/api/docs
- **Alternative Docs**: http://localhost:8001/api/redoc
- **Health Check**: http://localhost:8001/api/health

## 🔧 Configuration

### Environment Variables
- `MONGO_URL`: MongoDB connection string (default: mongodb://localhost:27017/fitgear)
- `SECRET_KEY`: JWT secret key for authentication
- `STRIPE_SECRET_KEY`: Stripe secret key for payments
- `ALLOWED_ORIGINS`: CORS allowed origins (default: http://localhost:3000)
- `PORT`: Server port (default: 8001)
- `HOST`: Server host (default: 0.0.0.0)

### Default Admin User
When first starting the server, a default admin user is created with secure credentials.

⚠️ **Important**: Contact the system administrator for admin access credentials.

## 🧪 Testing

### API Testing
```bash
# Run comprehensive API tests
./test_api.sh

# Test individual endpoints
curl http://localhost:8001/api/health
curl http://localhost:8001/api/products
curl http://localhost:8001/api/categories
```

### Database Operations
The server automatically creates:
- Database indexes for better performance
- Sample products and blog posts
- Admin user account

## 🐛 Troubleshooting

### Common Issues

1. **ModuleNotFoundError**: Make sure to use the virtual environment:
   ```bash
   /home/yoseph/fit-gear/.venv/bin/python server.py
   ```

2. **MongoDB Connection Error**: Ensure MongoDB Docker container is running:
   ```bash
   ./mongodb.sh status
   ./mongodb.sh start
   ```

3. **Permission Denied**: Make sure scripts are executable:
   ```bash
   chmod +x start_server.sh
   chmod +x install_mongodb.sh
   ```

4. **Port Already in Use**: Change the port in `.env`:
   ```bash
   PORT=8002
   ```

## 📁 Project Structure

```
backend/
├── server.py              # Main FastAPI application
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment variables template
├── requirements.txt      # Python dependencies
├── start_server.sh       # Server start script
├── install_mongodb.sh    # MongoDB installation script
├── fitgear_api.log       # Application logs
└── README.md            # This file
```

## 🔒 Security

- JWT tokens for authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Pydantic
- Rate limiting (basic implementation)

## 📞 Support

If you encounter issues:
1. Check the logs in `fitgear_api.log`
2. Verify MongoDB is running
3. Ensure all environment variables are set
4. Check the API documentation at `/api/docs`

## 🎯 Production Deployment

For production deployment:
1. Use strong, unique secret keys
2. Configure proper CORS origins
3. Set up SSL/HTTPS
4. Use a production MongoDB instance
5. Configure proper logging
6. Set up monitoring and health checks
