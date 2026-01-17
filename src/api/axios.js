import axios from 'axios'

// Ensure API URL is always injected at build time
const API_BASE = import.meta.env.VITE_API_URL

if (!API_BASE) {
  throw new Error(
    'VITE_API_URL is not defined! Check your frontend environment variables and redeploy.'
  )
}

// Axios instance
const api = axios.create({
  baseURL: API_BASE, // keep the /api path included
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
