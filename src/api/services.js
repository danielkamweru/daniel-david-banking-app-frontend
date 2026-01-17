import api from './axios'

export const authService = {
  register: (data) => api.post('/api/auth/signup', data).then(res => res.data),
  login: (data) => api.post('/api/auth/login', data).then(res => res.data)
}

export const transactionService = {
  getAll: () => api.get('/api/transactions').then(res => res.data),
  transfer: (data) => api.post('/api/transactions/transfer', data).then(res => res.data),
  deposit: (data) => api.post('/api/transactions/deposit', data).then(res => res.data)
}

export const userService = {
  getProfile: () => api.get('/api/users/me').then(res => res.data),
  updateProfile: (data) => api.put('/api/users/me', data).then(res => res.data),
  resetPin: (data) => api.patch('/api/users/me/reset-pin', data).then(res => res.data),
  deleteAccount: () => api.delete('/api/users/me').then(res => res.data)
}