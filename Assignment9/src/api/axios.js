import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
})

// If A8 later returns JWT, attach here:
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sessionToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
