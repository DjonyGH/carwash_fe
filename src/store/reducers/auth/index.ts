import { IUser } from '../../../types'
import { IAuthState, TAuthAction, EAuthAction } from './types'

const initialState: IAuthState = {
  isAuth: false,
  user: {} as IUser,
}

export default function authReducer(state = initialState, action: TAuthAction): IAuthState {
  switch (action.type) {
    case EAuthAction.SET_IS_AUTH:
      return { ...state, isAuth: action.payload }
    default:
      return state
  }
}
