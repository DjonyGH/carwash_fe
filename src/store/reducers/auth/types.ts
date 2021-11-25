import { IUser } from '../../../types'

export interface IAuthState {
  isAuth: boolean | undefined
}

export enum EAuthAction {
  SET_IS_AUTH = 'SET_IS_AUTH',
}

export interface ISetIsAuthAction {
  type: EAuthAction.SET_IS_AUTH
  payload: boolean
}

export type TAuthAction = ISetIsAuthAction

export interface IAuthResponce {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IRefreshResponce {
  user: IUser
  accessToken: string
}

export interface IAuthBody {
  login: string
  password: string
}
