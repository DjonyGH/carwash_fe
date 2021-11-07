import { IUser } from '../../../types'

export interface IUserState {
  user: IUser
}

export enum EUserAction {
  SET_USER = 'SET_USER',
}

export interface ISetUserAction {
  type: EUserAction.SET_USER
  payload: IUser
}

export type TUserAction = ISetUserAction
