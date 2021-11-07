export interface IUser {
  id: number
  login: string
  name?: string
  birthday?: string
  gender?: 'MALE' | 'FEMALE'
  email?: string
  hasPassword: boolean
  isBlocked: boolean
  garage?: IUserCar[]
}

export interface IUserCar {
  id: number
  brand: string
  model: string
  carTypeId: number
  carNumber: string
}

export interface ICarBrand {
  id: number
  name: string
}

export interface ICarModel {
  id: number
  name: string
  carTypeId: number
}

export interface ICarType {
  id: number
  name: string
}
