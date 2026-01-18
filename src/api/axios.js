import axios from "axios";
// 1️ Ensure API URL is injected
const API_BASE = import.meta.env.VITE_API_URL;

if (!API_BASE) {
  throw new Error(
    "VITE_API_URL is not defined! Check your Vercel environment variables and redeploy."
  );
}

console.log("Using API URL:", API_BASE); // Optional: confirm URL on page load


// 2️ Create Axios instance

const api = axios.create({
  baseURL: API_BASE, // must include /api in VITE_API_URL
  headers: {
    "Content-Type": "application/json",
  },
});


// 3️Add token automatically if exists

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

// 4️ Handle 401 globally

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirect to login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// 5️Export Axios instance

export default api;
