import axios from "axios";
// 1️ Ensure API URL is injected
const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error(
    "VITE_API_URL is not defined! Check your environment variables."
  );
}

console.log("Using API URL:", API_BASE); // Optional: confirm URL on page load

// Fallback URLs for different environments
const FALLBACK_URLS = {
  development: "http://localhost:8000",
  production: "https://banking-app-2-eyu9.onrender.com"
};

// 2️ Create Axios instance with retry logic

const api = axios.create({
  baseURL: API_BASE, // must include /api in VITE_API_URL
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// 3️ Add token automatically if exists

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 4️ Handle 401 globally and add retry logic for network errors

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 unauthorized
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
      return Promise.reject(error);
    }
    
    // Handle network errors and try fallback
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      const currentEnv = import.meta.env.MODE || 'development';
      const fallbackUrl = FALLBACK_URLS[currentEnv === 'development' ? 'production' : 'development'];
      
      // Only retry if we haven't already tried this URL
      if (error.config.baseURL !== fallbackUrl) {
        console.warn(`Network error to ${API_BASE}, trying fallback: ${fallbackUrl}`);
        
        // Create a new config with fallback URL
        const retryConfig = {
          ...error.config,
          baseURL: fallbackUrl
        };
        
        // Retry the request with fallback
        return api.request(retryConfig);
      }
    }
    
    return Promise.reject(error);
  }
);

// 5️ Export Axios instance

export default api;
