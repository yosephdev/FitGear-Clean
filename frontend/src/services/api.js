import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/api/auth/register', userData),
  login: (credentials) => api.post('/api/auth/login', credentials),
  getCurrentUser: () => api.get('/api/auth/me'),
};

// Products API
export const productsAPI = {
  getProducts: (params = {}) => api.get('/api/products', { params }),
  getProduct: (id) => api.get(`/api/products/${id}`),
  createProduct: (productData) => api.post('/api/products', productData),
  updateProduct: (id, productData) => api.put(`/api/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/api/products/${id}`),
  getCategories: () => api.get('/api/categories'),
};

// Cart API
export const cartAPI = {
  getCart: () => api.get('/api/cart'),
  addToCart: (productId, quantity) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);
    return api.post('/api/cart/add', formData);
  },
  removeFromCart: (productId) => api.delete(`/api/cart/remove/${productId}`),
  updateCartItem: (productId, quantity) => {
    const formData = new FormData();
    formData.append('quantity', quantity);
    return api.put(`/api/cart/update/${productId}`, formData);
  },
};

// Blog API
export const blogAPI = {
  getPosts: (params = {}) => api.get('/api/blog', { params }),
  getPost: (id) => api.get(`/api/blog/${id}`),
  createPost: (postData) => api.post('/api/blog', postData),
  updatePost: (id, postData) => api.put(`/api/blog/${id}`, postData),
  deletePost: (id) => api.delete(`/api/blog/${id}`),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/api/wishlist'),
  addToWishlist: (productId) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    return api.post('/api/wishlist/add', formData);
  },
  removeFromWishlist: (productId) => api.delete(`/api/wishlist/remove/${productId}`),
};

// Orders API
export const ordersAPI = {
  getOrders: () => api.get('/api/orders'),
  getOrder: (id) => api.get(`/api/orders/${id}`),
  createOrder: (orderData) => api.post('/api/orders', orderData),
  updateOrderStatus: (id, status) => api.put(`/api/orders/${id}/status`, { status }),
};

// Payment API
export const paymentAPI = {
  createPaymentIntent: (amount) => api.post('/api/payment/create-intent', { amount }),
  confirmPayment: (paymentIntentId) => api.post('/api/payment/confirm', { payment_intent_id: paymentIntentId }),
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: (productId) => api.get(`/api/products/${productId}/reviews`),
  addReview: (productId, rating, comment) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('rating', rating);
    formData.append('comment', comment);
    return api.post('/api/reviews', formData);
  },
  updateReview: (id, reviewData) => api.put(`/api/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/api/reviews/${id}`),
};

// Utility functions
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default api;