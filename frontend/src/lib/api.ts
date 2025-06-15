import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    axiosInstance.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    axiosInstance.post('/auth/login', data),
  getProfile: () => axiosInstance.get('/auth/me'),
  updateProfile: (data: { firstName: string; lastName: string; email: string; bio?: string }) =>
    axiosInstance.put('/auth/profile', data),
};

// Products API
export const productsAPI = {
  getAll: (params?: { category?: string; search?: string; status?: string }) =>
    axiosInstance.get('/products', { params }),
  getOne: (id: string) => axiosInstance.get(`/products/${id}`),
  create: (formData: FormData) =>
    axiosInstance.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id: string, formData: FormData) =>
    axiosInstance.put(`/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (id: string) => axiosInstance.delete(`/products/${id}`),
  getSellerProducts: (sellerId: string) =>
    axiosInstance.get(`/products/seller/${sellerId}`),
  getMyProducts: () => axiosInstance.get('/products/my-products'),
};

// Orders API
export const ordersAPI = {
  create: (data: { productId: string }) => axiosInstance.post('/orders', data),
  getBought: () => axiosInstance.get('/orders/bought'),
  getSold: () => axiosInstance.get('/orders/sold'),
  getOne: (id: string) => axiosInstance.get(`/orders/${id}`),
  updateStatus: (id: string, data: { status: string }) =>
    axiosInstance.put(`/orders/${id}/status`, data),
  deliver: (id: string, data: { googleDriveLink: string }) =>
    axiosInstance.post(`/orders/${id}/deliver`, data),
};

// Export a combined API object for convenience
export const api = {
  authAPI,
  productsAPI,
  ordersAPI,
};

// Export the axios instance for direct use if needed
export default axiosInstance; 