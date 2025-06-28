const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  MARATHONS: `${API_BASE_URL}/marathons`,
  JWT: `${API_BASE_URL}/jwt`,
  // Add other endpoints as needed
};

export default API_ENDPOINTS; 