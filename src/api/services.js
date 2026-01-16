import api from './axios'

export const authService = {
  register: (data) => api.post('/auth/signup', data).then(res => res.data),
  login: (data) => api.post('/auth/login', data).then(res => res.data)
}

export const transactionService = {
  getAll: () => api.get('/transactions').then(res => res.data),
  transfer: (data) => api.post('/transactions/transfer', data).then(res => res.data),
  deposit: (data) => api.post('/transactions/deposit', data).then(res => res.data)
}

export const userService = {
  getProfile: () => api.get('/users/me').then(res => res.data),
  updateProfile: (data) => api.put('/users/me', data).then(res => res.data),
  resetPin: (data) => api.patch('/users/me/reset-pin', data).then(res => res.data),
  deleteAccount: () => api.delete('/users/me').then(res => res.data)
}