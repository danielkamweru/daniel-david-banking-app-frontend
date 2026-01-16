import api from './axios'

export const authService = {
  register: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data)
}

export const transactionService = {
  getAll: () => api.get('/transactions'),
  transfer: (data) => api.post('/transactions/transfer', data),
  deposit: (data) => api.post('/transactions/deposit', data)
}

export const userService = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  resetPin: (data) => api.patch('/users/me/reset-pin', data),
  deleteAccount: () => api.delete('/users/me')
}