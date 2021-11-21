import { TAppDispatch } from '../..'
import { EAuthAction, IAuthResponce, IRefreshResponce, ISetIsAuthAction } from './types'
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
  login: (login: string, password: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGIN', login, password)
      const responce = await axios.post<any, AxiosResponse<IAuthResponce>>(`${BASE_URL}/auth/login`, {
        login,
        password,
      })
      const { user, accessToken, refreshToken } = responce.data
      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('refresh-token', refreshToken)
      dispatch(authActionCreator.setIsAuth(true))
      dispatch(userActionCreator.setUser(user))
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  logout: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGOUT')
      await http.post('/auth/logout', { refreshToken: localStorage.getItem('refresh-token') })

      localStorage.removeItem('access-token')
      localStorage.removeItem('refresh-token')
      dispatch(authActionCreator.setIsAuth(false))
      dispatch(userActionCreator.setUser({} as IUser))
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  checkAuth: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('REFRESH')
      const responce = await axios.post<any, AxiosResponse<IRefreshResponce>>(`${BASE_URL}/token/refresh`, {
        refreshToken: localStorage.getItem('refresh-token'),
      })

      const { user, accessToken } = responce.data
      localStorage.setItem('access-token', accessToken)
      dispatch(authActionCreator.setIsAuth(true))
      dispatch(userActionCreator.setUser(user))
    } catch (error: any) {
      // dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
