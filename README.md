# FitGear 💪

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://frontend-iota-seven-68.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

FitGear is a modern, full-stack e-commerce platform for sports equipment and fitness gear. Built with FastAPI, MongoDB, Next.js 15, and TypeScript, it delivers a seamless shopping experience with real-time inventory management, secure payments, and an intuitive user interface.

**[🚀 Try Live Demo](https://frontend-iota-seven-68.vercel.app/)**

![FitGear App Preview](/fitgear-preview.png)

## ✨ Key Features

- 🛍️ **Product Catalog** - Browse extensive fitness equipment with detailed specs, pricing, and ratings
- 📂 **Smart Categories** - Organized product categories (strength training, cardio, accessories, apparel, nutrition)
- 🛒 **Shopping Cart** - Real-time cart management with inventory validation
- ⭐ **Reviews & Ratings** - User-generated reviews with 5-star rating system
- 📝 **Blog & Content** - Fitness tips, workout guides, and gear recommendations
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🔐 **Secure Authentication** - JWT-based authentication with bcrypt password hashing
- 💳 **Stripe Integration** - Secure payment processing with PCI compliance
- 👨‍💼 **Admin Dashboard** - Product and user management interface
- 🚀 **High Performance** - Server-side rendering with Next.js 15 App Router

## 🛠️ Tech Stack

### Backend

- **[FastAPI](https://fastapi.tiangolo.com/)** 0.104.1 - Modern async Python web framework
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database (Railway hosted)
- **[Motor](https://motor.readthedocs.io/)** 3.3.2 - Async MongoDB driver
- **[Pydantic](https://pydantic.dev/)** 2.5.0 - Data validation with Python type hints
- **[Uvicorn](https://www.uvicorn.org/)** 0.24.0 - Lightning-fast ASGI server
- **[Mangum](https://mangum.io/)** 0.17.0 - AWS Lambda adapter for ASGI apps
- **[Stripe](https://stripe.com/)** 5.1.1 - Payment processing
- **Additional:** Python-jose, Passlib[bcrypt], Python-dotenv, Email-validator

### Frontend

- **[Next.js](https://nextjs.org/)** 15.5.6 - React framework with App Router
- **[React](https://react.dev/)** 19.1.0 - UI library with hooks
- **[TypeScript](https://www.typescriptlang.org/)** 5.x - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** 4.x - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library

### Deployment & Infrastructure

- **Frontend:** Vercel (optimized for Next.js)
- **Backend:** Railway (with MongoDB provisioning)
- **Payment:** Stripe (PCI-compliant processing)

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- Railway account (for backend deployment)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/yosephdev/FitGear.git
cd FitGear
```

### 2. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, Stripe keys, etc.

# Start local MongoDB (optional, if not using Railway)
./mongodb.sh start

# Start FastAPI server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Backend runs at:** <http://localhost:8001>

- **API Docs:** <http://localhost:8001/docs> (Swagger UI)
- **Health Check:** <http://localhost:8001/api/health>

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API URL and Stripe public key

# Start development server
npm run dev
```

**Frontend runs at:** <http://localhost:3000>

### 4. Environment Variables

**Backend (`.env`):**

```env
MONGODB_URI=mongodb://localhost:27017/fitgear
JWT_SECRET_KEY=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_EMAIL=admin@fitgear.com
ADMIN_PASSWORD=secure-password
```

**Frontend (`.env.local`):**

```env
NEXT_PUBLIC_API_URL=http://localhost:8001
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

See [docs/ENV_SETUP.md](docs/ENV_SETUP.md) for detailed configuration.

## 📚 API Documentation

### Core Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check endpoint |
| GET | `/api/products` | List all products (with filtering & pagination) |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/categories` | List all product categories |
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User authentication (returns JWT) |
| GET | `/api/cart` | Get user's shopping cart |
| POST | `/api/cart/add` | Add item to cart |
| GET | `/api/blog` | List blog posts |
| GET | `/api/orders` | List user orders |

**Interactive API Documentation:** Visit `http://localhost:8001/docs` when running locally

See [docs/API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md) for complete API reference.

### Testing the API

```bash
cd backend
./test_api.sh
```

## 🗂️ Project Structure

```plaintext
fit-gear/
├── backend/                    # FastAPI backend
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (not in repo)
│   ├── start_server.sh        # Server startup script
│   ├── mongodb.sh             # MongoDB management script
│   ├── test_api.sh            # API testing script
│   └── api/                   # API modules
│       ├── main.py
│       └── ...
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   └── checkout/
│   │   ├── components/        # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   └── ui/            # Radix UI components
│   │   ├── context/           # React Context providers
│   │   │   └── CartContext.tsx
│   │   ├── lib/               # Utilities and helpers
│   │   │   ├── api.ts         # API helper functions
│   │   │   └── utils.ts
│   │   └── types/             # TypeScript type definitions
│   │       └── product.ts
│   ├── public/                # Static assets
│   │   ├── logo-fit-gear.png
│   │   └── ...
│   ├── package.json           # Node.js dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   ├── tailwind.config.ts     # Tailwind CSS config
│   └── next.config.js         # Next.js configuration
├── docs/                       # Documentation
│   ├── API_DOCUMENTATION.md
│   ├── ENV_SETUP.md
│   └── DEPLOYMENT_VERCEL.md
├── LICENSE                     # MIT License
└── README.md                   # This file
```

## 👨‍💼 Admin Access

A default admin account is created automatically during initial database setup.

⚠️ **Security Notice:** Admin credentials are not stored in this repository. Contact the system administrator for admin access.

## 🔐 Security Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - Bcrypt encryption for user passwords
- ✅ **CORS Protection** - Configured cross-origin resource sharing
- ✅ **Input Validation** - Pydantic models for request validation
- ✅ **Stripe Integration** - PCI-compliant payment processing
- ✅ **Environment Variables** - Sensitive data stored securely

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

### Backend (Railway)

1. Create a new project on [Railway](https://railway.app/)
2. Connect your GitHub repository
3. Add MongoDB service from Railway's database menu
4. Set environment variables in Railway dashboard
5. Deploy automatically on push to main branch

See [docs/DEPLOYMENT_VERCEL.md](docs/DEPLOYMENT_VERCEL.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

**Developer:** [Yoseph Berhane](https://github.com/yosephdev)

- 📧 Email: <contact@yoseph.dev>
- 🐙 GitHub: [@yosephdev](https://github.com/yosephdev)
- 💼 LinkedIn: [Yoseph Berhane](https://www.linkedin.com/in/yoseph-berhane)

For bug reports and feature requests, please [open an issue](https://github.com/yosephdev/FitGear/issues).

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Stripe](https://stripe.com/) - Payment processing platform
- [Railway](https://railway.app/) - Deployment infrastructure
- [Vercel](https://vercel.com/) - Frontend hosting

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Yoseph Berhane](https://github.com/yosephdev)

</div>

