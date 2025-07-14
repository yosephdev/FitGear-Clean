import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8001/api');

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

// Helper to extract error messages consistently
const extractErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error.response?.data?.detail) return error.response.data.detail;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
      return Promise.reject(new Error('Please log in again.'));
    }
    
    // Convert error to a string message
    const errorMessage = extractErrorMessage(error);
    return Promise.reject(new Error(errorMessage));
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getProducts: (params = {}) => api.get('/products', { params }),
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getCategories: () => api.get('/categories'),
};  // Cart API
export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (productId, quantity) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);
    return api.post('/cart/add', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  removeFromCart: (productId) => api.delete(`/cart/remove/${productId}`),
  updateCartItem: (productId, quantity) => {
    const formData = new FormData();
    formData.append('quantity', quantity);
    return api.put(`/cart/update/${productId}`, formData);
  },
};

// Blog API
export const blogAPI = {
  getPosts: (params = {}) => api.get('/blog', { params }),
  getPost: (id) => api.get(`/blog/${id}`),
  createPost: (postData) => api.post('/blog', postData),
  updatePost: (id, postData) => api.put(`/blog/${id}`, postData),
  deletePost: (id) => api.delete(`/blog/${id}`),
};

// Wishlist API
export const wishlistAPI = {
  getWishlist: () => api.get('/wishlist'),
  addToWishlist: (productId) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    return api.post('/wishlist/add', formData);
  },
  removeFromWishlist: (productId) => api.delete(`/wishlist/remove/${productId}`),
};

// Orders API
export const ordersAPI = {
  getOrders: () => api.get('/orders'),
  getOrder: (id) => api.get(`/orders/${id}`),
  createOrder: (orderData) => api.post('/orders', orderData),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};

// Payment API with improved error handling
export const paymentAPI = {
  createPaymentIntent: async (amount) => {
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      
      const response = await api.post('/payment/create-intent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (!response?.data?.client_secret) {
        throw new Error('Unable to initialize payment. Please try again.');
      }
      
      return response;
    } catch (error) {
      const errorMsg = extractErrorMessage(error);
      throw new Error(errorMsg);
    }
  },
  
  confirmPayment: async (paymentIntentId, shippingInfo) => {
    try {
      const formData = new FormData();
      formData.append('payment_intent_id', paymentIntentId);
      
      const shippingAddress = {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        address: shippingInfo.address,
        city: shippingInfo.city,
        state: shippingInfo.state,
        postal_code: shippingInfo.zipCode,
        country: shippingInfo.country,
      };
      
      formData.append('shipping_address', JSON.stringify(shippingAddress));
      
      const response = await api.post('/payment/confirm', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response;
    } catch (error) {
      const errorMsg = extractErrorMessage(error);
      throw new Error(errorMsg);
    }
  },
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: (productId) => api.get(`/products/${productId}/reviews`),
  addReview: (productId, rating, comment) => {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('rating', rating);
    formData.append('comment', comment);
    return api.post('/reviews', formData);
  },
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
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