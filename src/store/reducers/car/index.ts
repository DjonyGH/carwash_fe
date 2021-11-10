import { TCarAction, ECarAction, ICarState } from './types'

const initialState: ICarState = {
  brands: [],
  models: [],
  types: [],
}

export default function carReducer(state = initialState, action: TCarAction): ICarState {
  switch (action.type) {
    case ECarAction.SET_BRANDS:
      return { ...state, brands: action.payload }
    case ECarAction.SET_MODELS:
      return { ...state, models: action.payload }
    case ECarAction.SET_TYPES:
      return { ...state, types: action.payload }
    default:
      return state
  }
}
