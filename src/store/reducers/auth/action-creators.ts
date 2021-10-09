import { TAppDispatch } from '../..'
import { EAuthAction, IAuthResponce, ISetIsAuthAction, ISetUserAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import { IUser } from '../../../types'
import http from '../../../utils/http'
import { AxiosResponse } from 'axios'

export const authActionCreator = {
  setIsAuth: (isAuth: boolean): ISetIsAuthAction => ({
    type: EAuthAction.SET_IS_AUTH,
    payload: isAuth,
  }),
  setUser: (user: IUser): ISetUserAction => ({
    type: EAuthAction.SET_USER,
    payload: user,
  }),
  login: (login: string, pass: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGIN', login, pass)
      const responce = await http.post<any, AxiosResponse<IAuthResponce>>('/login', { login, pass })
      const { accessToken, refreshToken, user } = responce.data
      localStorage.setItem('access-token', accessToken)
      localStorage.setItem('refresh-token', refreshToken)
      dispatch(authActionCreator.setIsAuth(true))
      dispatch(authActionCreator.setUser(user))
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
      dispatch(authActionCreator.setUser({} as IUser))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
