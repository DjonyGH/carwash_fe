import { ICarBrand, ICarModel, ICarType } from '../../../types'

export interface ICarState {
  brands: ICarBrand[]
  models: ICarModel[]
  types: ICarType[]
}

export enum ECarAction {
  SET_BRANDS = 'SET_BRANDS',
  SET_MODELS = 'SET_MODELS',
  SET_TYPES = 'SET_TYPES',
}

export interface ISetBrandsAction {
  type: ECarAction.SET_BRANDS
  payload: ICarBrand[]
}

export interface ISetModelsAction {
  type: ECarAction.SET_MODELS
  payload: ICarModel[]
}

export interface ISetTypesAction {
  type: ECarAction.SET_TYPES
  payload: ICarType[]
}

export type TCarAction = ISetBrandsAction | ISetModelsAction | ISetTypesAction
