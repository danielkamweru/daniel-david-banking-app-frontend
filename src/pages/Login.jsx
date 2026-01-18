import { useToast } from '../context/ToastContext'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService, userService } from '../api/services'
import { useNotifications } from '../context/NotificationContext'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', pin: '' })
  const { showToast } = useToast()
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { addNotification } = useNotifications()

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format'
    
    if (!formData.pin) newErrors.pin = 'PIN is required'
    
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      try {
        // Clear any existing tokens first
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        const response = await authService.login(formData)
        const { access_token } = response
        localStorage.setItem('token', access_token)
        
        // Fetch user profile
        const userResponse = await userService.getProfile()
        login(userResponse)
        addNotification({
          type: 'success',
          title: 'Login Successful',
          message: 'Credentials verified. You are now logged in.'
        })
        showToast({ title: 'Login Successful', message: 'Credentials verified. You are now logged in.', type: 'success' })
        navigate('/dashboard')
      } catch (error) {
        console.error('Login error:', error)
        console.error('Error response:', error.response)
        setErrors({ general: error.response?.data?.detail || error.message || 'Login failed. Please check your credentials.' })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-blue-700 ">GROUP-8 -BANKING APP</Link>
          <h1 className="mt-6 text-3xl font-bold text-blue-700">Welcome back</h1>
          <p className="mt-2 text-white">Sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl space-y-6">
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
              {errors.general}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-colors ${
                errors.email ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-white mb-2">
              PIN
            </label>
            <input
              id="pin"
              name="pin"
              type="password"
              autoComplete="current-password"
              value={formData.pin}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-colors ${
                errors.pin ? 'border-red-500' : 'border-white/20'
              }`}
              placeholder="Enter your PIN"
            />
            {errors.pin && <p className="mt-1 text-sm text-red-400">{errors.pin}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-700 text-[#0A192F] py-3 px-4 rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(100,255,218,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-white">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-700 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}