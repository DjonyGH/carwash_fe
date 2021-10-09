import { IUser } from '../../../types'

export interface IAuthState {
  isAuth: boolean
  user: IUser
}

export enum EAuthAction {
  SET_IS_AUTH = 'SET_IS_AUTH',
  SET_USER = 'SET_USER',
}

export interface ISetIsAuthAction {
  type: EAuthAction.SET_IS_AUTH
  payload: boolean
}

export interface ISetUserAction {
  type: EAuthAction.SET_USER
  payload: boolean
}

export type TAuthAction = ISetIsAuthAction
