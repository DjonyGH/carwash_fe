import axios, { AxiosRequestConfig } from 'axios'
import { IAuthResponce } from '../store/reducers/auth/types'

export const BASE_URL = 'http://localhost:5000/api'

const http = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

http.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers && (config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`)
  return config
})

http.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.responce.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const responce = await axios.get<IAuthResponce>(`${BASE_URL}/refresh`, { withCredentials: true })
        localStorage.setItem('access-token', responce.data.accessToken)
        // localStorage.setItem('refresh-token', responce.data.refreshToken)
        http.request(originalRequest)
      } catch (error) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)

export default http
