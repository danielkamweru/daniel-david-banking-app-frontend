import { createContext, useContext, useState, useEffect } from 'react'
import { userService } from '../api/services'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (userData) => setUser(userData)
  const logout = () => {
    setUser(null)
    window.location.href = '/'
  }

  const updateUser = async () => {
    try {
      const updatedUser = await userService.getProfile()
      setUser(updatedUser)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}