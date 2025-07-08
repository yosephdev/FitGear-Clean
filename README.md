# FitGear

FitGear is a modern e-commerce platform designed for sports equipment enthusiasts. The platform provides a seamless shopping experience for fitness gear, workout equipment, and accessories with a powerful backend API and responsive React frontend.

[Try FitGearLive](https://yosephdev.github.io/fit-gear/) | [View Demo](#features)

![FitGear App Preview](public/fitgear-preview.png)

## ✨ Features

- **🛍️ Product Listings:** Browse a variety of sports equipment with detailed descriptions, prices, and ratings
- **📂 Product Categories:** Organized items by categories like strength training and fitness accessories
- **🛒 Shopping Cart:** Add, update, and review items with real-time inventory management
- **⭐ User Reviews:** Share and read product reviews with 5-star rating system
- **📝 Blog:** Feature articles on fitness tips, workout routines, and gear recommendations
- **📱 Responsive Design:** Full compatibility across desktops, tablets, and mobile devices
- **🔐 Secure Authentication:** JWT-based user authentication and authorization
- **💳 Payment Integration:** Stripe payment processing for secure transactions
- **👨‍💼 Admin Panel:** Product and user management with admin dashboard

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python 3.7+
- **MongoDB** - NoSQL database for flexible document storage
- **Docker** - Containerized MongoDB for easy development and deployment
- **Python 3.12** - Latest Python with async/await support

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Axios** - HTTP client for API communication
- **React Router** - Declarative routing for React applications

### Key Packages
- **Motor** - Async MongoDB driver for Python
- **Pydantic** - Data validation using Python type annotations
- **JWT** - JSON Web Tokens for secure authentication
- **Stripe** - Payment processing integration
- **Bcrypt** - Password hashing for security

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 16+
- Docker (for MongoDB)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd fit-gear
```

### 2. Backend Setup
```bash
# Configure Python environment (virtual environment will be created automatically)
cd backend

# Install dependencies and start MongoDB + server
./start_server.sh
```

The backend will be available at: http://localhost:8001
- API Documentation: http://localhost:8001/api/docs
- Health Check: http://localhost:8001/api/health

### 3. Frontend Setup
```bash
# In a new terminal
cd frontend
npm install
npm start
```

The frontend will be available at: http://localhost:3000

### 4. Environment Configuration
Copy and configure environment files:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend  
cp frontend/.env.example frontend/.env
```

See [ENV_SETUP.md](ENV_SETUP.md) for detailed configuration instructions.

## 📚 API Documentation

### Available Endpoints
- **GET /api/health** - Health check
- **GET /api/products** - List products with filtering and pagination
- **GET /api/categories** - Product categories
- **POST /api/auth/register** - User registration
- **POST /api/auth/login** - User authentication
- **GET /api/cart** - User's shopping cart
- **GET /api/blog** - Blog posts
- **GET /api/orders** - User orders

### Testing the API
```bash
cd backend
./test_api.sh
```

## 🔧 Development

### Backend Development
```bash
cd backend

# Start server with auto-reload
./start_server.sh

# Manage MongoDB
./mongodb.sh start|stop|restart|status|logs|shell

# Test API endpoints
./test_api.sh
```

### Frontend Development
```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## 🗂️ Project Structure

```
fit-gear/
├── backend/                 # FastAPI backend
│   ├── server.py           # Main FastAPI application
│   ├── .env               # Environment variables
│   ├── requirements.txt   # Python dependencies
│   ├── start_server.sh   # Server startup script
│   ├── mongodb.sh        # MongoDB management
│   └── test_api.sh       # API testing script
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context providers
│   │   └── services/    # API services
│   ├── public/          # Static assets
│   └── package.json     # Node.js dependencies
├── ENV_SETUP.md          # Environment setup guide
└── README.md            # This file
```

## 👨‍💼 Default Admin Account

A default admin account is created automatically:
- **Email:** admin@fitgear.com
- **Password:** admin123

⚠️ **Important:** Change the admin password in production!

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Pydantic
- Rate limiting
- Secure payment processing with Stripe

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

FitGear is released under the MIT License. See [LICENSE](LICENSE) for details.

## 📞 Contact

For questions, suggestions, or contributions:
- **Developer:** [Yoseph Berhane](mailto:contact@yoseph.dev)
- **GitHub:** [Your GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Frontend powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Payment processing: [Stripe](https://stripe.com/)

---

**Status:** ✅ **Production Ready** - Backend and frontend fully functional with MongoDB integration!
