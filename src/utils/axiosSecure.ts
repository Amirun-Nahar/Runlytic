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
    console.log('Making request to:', (config.baseURL || '') + (config.url || ''));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosSecure.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.data);
    return response;
  },
  async (error) => {
    console.error('API Error:', error.response?.status, error.response?.data, error.message);
    
    // Handle cases where backend returns HTML instead of JSON
    if (error.response?.data && typeof error.response.data === 'string') {
      if (error.response.data.includes('Loading') || 
          error.response.data.includes('<html') || 
          error.response.data.includes('<!DOCTYPE')) {
        console.error('Backend is still loading or returning HTML instead of JSON');
        const customError = new Error('Backend is still starting up. Please try again in a moment.');
        customError.name = 'BackendLoadingError';
        return Promise.reject(customError);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error - backend might be down');
      const customError = new Error('Unable to connect to server. Please check your connection.');
      customError.name = 'NetworkError';
      return Promise.reject(customError);
    }
    
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle token expiration
      localStorage.removeItem('access-token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosSecure; 