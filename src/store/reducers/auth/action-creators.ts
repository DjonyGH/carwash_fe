import { TAppDispatch } from '../..'
import { EAuthAction, IAuthResponce, ISetIsAuthAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import { IUser } from '../../../types'
import http, { BASE_URL } from '../../../utils/http'
import axios, { AxiosResponse } from 'axios'
import { userActionCreator } from '../user/action-creators'

export const authActionCreator = {
  setIsAuth: (isAuth: boolean): ISetIsAuthAction => ({
    type: EAuthAction.SET_IS_AUTH,
    payload: isAuth,
  }),
  login: (login: string, pass: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGIN', login, pass)
      const responce = await http.post<any, AxiosResponse<IAuthResponce>>('/login', { login, pass })
      const { accessToken, user } = responce.data
      localStorage.setItem('access-token', accessToken)
      dispatch(authActionCreator.setIsAuth(true))
      dispatch(userActionCreator.setUser(user))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  logout: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGOUT')
      await http.post('/logout')

      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      dispatch(authActionCreator.setIsAuth(false))
      dispatch(userActionCreator.setUser({} as IUser))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  checkAuth: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('REFRESH')
      const responce = await axios.get<IAuthResponce>(`${BASE_URL}/refresh`, { withCredentials: true })

      const { accessToken, user } = responce.data
      localStorage.setItem('access-token', accessToken)
      dispatch(authActionCreator.setIsAuth(true))
      dispatch(userActionCreator.setUser(user))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
