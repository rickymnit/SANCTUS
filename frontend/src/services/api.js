import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Gallery API
export const galleryApi = {
  getAll: (category) => api.get('/gallery', { params: { category } }),
  getCategories: () => api.get('/gallery/categories'),
  upload: (formData) => api.post('/gallery/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => api.delete(`/gallery/admin/${id}`),
};

// Genres API
export const genresApi = {
  getAll: () => api.get('/genres'),
  getById: (id) => api.get(`/genres/${id}`),
};

// Events API
export const eventsApi = {
  getAll: () => api.get('/events'),
  getUpcoming: () => api.get('/events?upcoming=true'),
  getPast: () => api.get('/events?past=true'),
  create: (data) => api.post('/events/admin/', data),
  delete: (id) => api.delete(`/events/admin/${id}`),
};

// Contact API
export const contactApi = {
  submit: (data) => api.post('/contact', data),
  getSubmissions: () => api.get('/contact/admin/submissions'),
  updateStatus: (id, status) => api.patch(`/contact/admin/submissions/${id}?status=${status}`),
  delete: (id) => api.delete(`/contact/admin/submissions/${id}`),
};

export default api;
