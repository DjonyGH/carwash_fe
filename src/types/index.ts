export interface IUser {
  id: string
  login: string
  name?: string
  birthday?: string
  gender?: 'MALE' | 'FEMALE'
  email?: string
  hasPassword: boolean
  isBlocked: boolean
}

export interface IUserCar {
  _id: string
  brand: string
  model: string
  type: string
  carNumber: string
}

export interface ICarBrand {
  id: number
  name: string
}

export interface ICarModel {
  id: number
  name: string
}

export interface ICarType {
  id: number
  name: string
}

export enum EMode {
  view = 'view',
  edit = 'edit',
}
