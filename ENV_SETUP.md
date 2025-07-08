# Environment Variables Setup Guide

This guide explains how to configure environment variables for both the backend and frontend of the FitGear application.

## Backend Environment Variables

### 1. Copy the example file
```bash
cp backend/.env.example backend/.env
```

### 2. Configure your environment variables in `backend/.env`:

#### Required Variables:
- `MONGO_URL`: MongoDB connection string
- `SECRET_KEY`: JWT secret key
- `STRIPE_SECRET_KEY`: Your Stripe secret key for payments

#### Optional Variables:
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS
- `PORT`: Server port (default: 8001)
- `HOST`: Server host (default: 0.0.0.0)
- `SENDGRID_API_KEY`: For sending emails
- `FROM_EMAIL`: Email sender address

### 3. Example Configuration:
```env
# Database
MONGO_URL=mongodb://localhost:27017/fitgear

# Security
SECRET_KEY=your-super-secret-key-here-change-this-in-production

# Payment
STRIPE_SECRET_KEY=sk_test_51AbCdEf...

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

## Frontend Environment Variables

### 1. Copy the example file
```bash
cp frontend/.env.example frontend/.env
```

### 2. Configure your environment variables in `frontend/.env`:

#### Required Variables:
- `REACT_APP_API_URL`: Backend API URL
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key

#### Optional Variables:
- `REACT_APP_NAME`: Application name
- `REACT_APP_ENVIRONMENT`: Environment (development/production)
- Feature flags and social media links

### 3. Example Configuration:
```env
# API
REACT_APP_API_URL=http://localhost:8001

# Stripe
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEf...

# App
REACT_APP_NAME=FitGear
REACT_APP_ENVIRONMENT=development
```

## MongoDB Setup

MongoDB runs in Docker for better compatibility and easier management:

### Start MongoDB:
```bash
cd backend
./mongodb.sh start
```

### MongoDB Management:
```bash
./mongodb.sh start    # Start MongoDB container
./mongodb.sh stop     # Stop MongoDB container
./mongodb.sh restart  # Restart MongoDB container
./mongodb.sh status   # Check container status
./mongodb.sh logs     # View MongoDB logs
./mongodb.sh shell    # Open MongoDB shell
```

The MongoDB data is persisted in a Docker volume, so your data will be preserved across container restarts.

## Important Notes:

1. **Never commit `.env` files** to version control - they contain sensitive information
2. **Always use `.env.example`** as a template for other developers
3. **React environment variables** must start with `REACT_APP_` to be accessible in the browser
4. **Restart the development server** after changing environment variables
5. **Generate strong secrets** for production environments

## Security Best Practices:

1. Use different API keys for development and production
2. Generate a strong, random SECRET_KEY for JWT tokens
3. Restrict CORS origins in production
4. Use environment-specific MongoDB databases
5. Enable HTTPS in production

## Common Issues:

1. **Environment variables not loading**: Make sure to restart your development server
2. **CORS errors**: Check that your frontend URL is in ALLOWED_ORIGINS
3. **Database connection issues**: Verify your MONGO_URL is correct
4. **Payment issues**: Ensure your Stripe keys match (test keys for development)

## Running the Application:

### Backend:
```bash
cd backend
./start_server.sh
```

### Frontend:
```bash
cd frontend
npm install
npm start
```

### Testing:
```bash
cd backend
./test_api.sh
```
