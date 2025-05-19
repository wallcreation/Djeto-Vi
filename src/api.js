// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:8000', // à adapter
  headers: {
    'Content-Type': 'application/json',
  },
})

// 🔐 Ajouter le token automatiquement dans les headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('session_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
