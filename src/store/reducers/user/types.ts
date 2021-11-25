import { IUser, IUserCar } from '../../../types'

export interface IUserState {
  user: IUser
  userCars: IUserCar[]
}

export enum EUserAction {
  SET_USER = 'SET_USER',
  SET_USER_CARS = 'SET_USER_CARS',
}

export interface ISetUserAction {
  type: EUserAction.SET_USER
  payload: IUser
}

export interface ISetUserCarsAction {
  type: EUserAction.SET_USER_CARS
  payload: IUserCar[]
}

export type TUserAction = ISetUserAction | ISetUserCarsAction
