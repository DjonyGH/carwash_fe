export interface ICarState {
  brands: string[]
  models: string[]
  types: string[]
}

export enum ECarAction {
  SET_BRANDS = 'SET_BRANDS',
  SET_MODELS = 'SET_MODELS',
  SET_TYPES = 'SET_TYPES',
}

export interface ISetBrandsAction {
  type: ECarAction.SET_BRANDS
  payload: string[]
}

export interface ISetModelsAction {
  type: ECarAction.SET_MODELS
  payload: string[]
}

export interface ISetTypesAction {
  type: ECarAction.SET_TYPES
  payload: string[]
}

export type TCarAction = ISetBrandsAction | ISetModelsAction | ISetTypesAction
