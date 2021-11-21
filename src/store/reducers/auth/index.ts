import { IAuthState, TAuthAction, EAuthAction } from './types'

const initialState: IAuthState = {
  isAuth: undefined,
}

export default function authReducer(state = initialState, action: TAuthAction): IAuthState {
  switch (action.type) {
    case EAuthAction.SET_IS_AUTH:
      return { ...state, isAuth: action.payload }
    default:
      return state
  }
}
