import axios from 'axios';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle token expiration
      localStorage.removeItem('access-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosSecure; 