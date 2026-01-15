import api from './axios'

export const authService = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout')
}

export const accountService = {
  getAll: () => api.get('/accounts'),
  getById: (id) => api.get(`/accounts/${id}`),
  create: (data) => api.post('/accounts', data),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`)
}

export const transactionService = {
  getAll: () => api.get('/transactions'),
  getByAccountId: (accountId) => api.get(`/transactions/account/${accountId}`),
  create: (data) => api.post('/transactions', data),
  transfer: (data) => api.post('/transactions/transfer', data)
}

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data)
}