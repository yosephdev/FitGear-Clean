# FitGear

FitGear is a modern e-commerce platform designed for sports equipment enthusiasts. The platform provides a seamless shopping experience for fitness gear, workout equipment, and accessories with a powerful backend API and responsive React frontend.

[Try FitGear Live](https://yosephdev.github.io/fit-gear/)

![FitGear App Preview](/fitgear-preview.png)

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


# FitGear

FitGear is a modern e-commerce platform for sports equipment enthusiasts, featuring a robust FastAPI backend (deployed on Railway with MongoDB) and a Next.js frontend with Stripe payments and a custom API helper.

[Live Demo](https://fitgear.com) <!-- Update with your production URL -->

![FitGear App Preview](/fitgear-preview.png)

## ✨ Features

- **Product Listings:** Browse sports equipment with details, prices, and ratings
- **Product Categories:** Organized by type (e.g., strength, accessories)
- **Shopping Cart:** Add, update, and review items
- **User Reviews:** 5-star rating system
- **Blog:** Fitness tips and gear recommendations
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Secure Authentication:** JWT-based user auth
- **Stripe Payments:** Secure checkout
- **Admin Panel:** Product/user management

## 🛠️ Tech Stack

### Backend
- **FastAPI** (Python 3.9+) — async API framework
- **MongoDB** — cloud NoSQL database (Railway)
- **Motor** — async MongoDB driver
- **Pydantic** — data validation
- **Mangum** — AWS Lambda compatibility
- **Uvicorn** — ASGI server
- **Python-dotenv, Passlib, Stripe, Email-validator**

### Frontend
- **Next.js 15** — React framework (App Router)
- **TypeScript** — static typing
- **Tailwind CSS** — utility-first styling
- **Radix UI, Lucide-react** — UI components/icons
- **Stripe** — payment integration
- **Custom API Helper** — dynamic API URL management

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- Railway account (for backend deployment)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd fit-gear
```

### 2. Backend Setup
```bash
cd backend
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate
# Install dependencies
pip install -r requirements.txt
# Start local MongoDB (or connect to Railway)
./mongodb.sh start
# Start FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8001
```
Backend runs at: http://localhost:8001

#### Railway Deployment
- Push backend to Railway and set environment variables (see `ENV_SETUP.md`)
- MongoDB is provisioned by Railway

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: http://localhost:3000

### 4. Environment Configuration
Copy and configure environment files:
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env
```
See [ENV_SETUP.md](docs/ENV_SETUP.md) for details.

## 📚 API Documentation

Key Endpoints:
- `GET /api/health` — Health check
- `GET /api/products` — List products
- `GET /api/categories` — Product categories
- `POST /api/auth/register` — Register
- `POST /api/auth/login` — Login
- `GET /api/cart` — User cart
- `GET /api/blog` — Blog posts

See [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for full details.

## 🗂️ Project Structure

```
fit-gear/
├── backend/                 # FastAPI backend
│   ├── server.py           # Main FastAPI app
│   ├── requirements.txt   # Python dependencies
│   ├── start_server.sh   # Server startup script
│   ├── mongodb.sh        # MongoDB management
│   └── test_api.sh       # API testing script
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages/components
│   │   ├── components/    # UI components
│   │   ├── context/       # Context providers
│   │   ├── lib/           # API helpers
│   │   └── types/         # TypeScript types
│   ├── public/            # Static assets (add favicon.ico here)
│   └── package.json       # Node.js dependencies
├── docs/                  # Documentation
└── README.md              # This file
```

## 👨‍💼 Admin Access

Default admin account is created on setup. Credentials are not public—contact admin for access.

## 🔐 Security Features

- JWT authentication
- Password hashing (bcrypt)
- CORS protection
- Input validation (Pydantic)
- Stripe secure payments

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
- **GitHub:** [GitHub Profile](https://github.com/yosephdev)

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Frontend powered by [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Payment: [Stripe](https://stripe.com/)

---

**Status:** ✅ **Production Ready** — Backend (FastAPI, Railway, MongoDB) and frontend (Next.js, Stripe) are fully functional!
### 2. Backend Setup

```bash
# Configure Python environment (virtual environment will be created automatically)
cd backend

# Install dependencies and start MongoDB + server
./start_server.sh
```

The backend will be available at: <http://localhost:8001>

- API Documentation: <http://localhost:8001/api/docs>
- Health Check: <http://localhost:8001/api/health>

### 3. Frontend Setup

```bash
# In a new terminal
cd frontend
npm install
npm start
```

The frontend will be available at: <http://localhost:3000>

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

## 👨‍💼 Admin Access

A default admin account is created automatically during initial setup. For security reasons, the admin credentials are not displayed publicly.

⚠️ **Important:** Contact the system administrator for admin access credentials.

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
- **GitHub:** [GitHub Profile](https://github.com/yosephdev)

## 🙏 Acknowledgments

- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Frontend powered by [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Payment processing: [Stripe](https://stripe.com/)