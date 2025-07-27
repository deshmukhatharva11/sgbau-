import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  timeout: 10000,
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
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

// Ideas API
export const ideasAPI = {
  getAll: (params) => api.get('/ideas', { params }),
  getById: (id) => api.get(`/ideas/${id}`),
  create: (ideaData) => api.post('/ideas', ideaData),
  update: (id, ideaData) => api.put(`/ideas/${id}`, ideaData),
  delete: (id) => api.delete(`/ideas/${id}`),
  endorse: (id, endorsementData) => api.post(`/ideas/${id}/endorse`, endorsementData),
  addComment: (id, commentData) => api.post(`/ideas/${id}/comments`, commentData),
  uploadFile: (id, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/ideas/${id}/files`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
  getStudents: (params) => api.get('/users/students', { params }),
  getColleges: (params) => api.get('/users/colleges', { params }),
  getIncubators: (params) => api.get('/users/incubators', { params }),
};

// Notifications API
export const notificationsAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
  deleteAll: () => api.delete('/notifications'),
};

// Analytics API
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard'),
  getIdeaStats: () => api.get('/analytics/ideas'),
  getUserStats: () => api.get('/analytics/users'),
  getRegionalStats: () => api.get('/analytics/regional'),
};

export default api;
