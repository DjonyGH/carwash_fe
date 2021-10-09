import axios, { AxiosRequestConfig } from 'axios'

const BASE_URL = 'http://localhost:5000/api'

const http = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers && (config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`)
  return config
})

export default http
