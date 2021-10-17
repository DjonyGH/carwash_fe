import { IUser } from '../../../types'
import { IUserState, TUserAction, EUserAction } from './types'

const initialState: IUserState = {
  user: {} as IUser,
}

export default function userReducer(state = initialState, action: TUserAction): IUserState {
  switch (action.type) {
    case EUserAction.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
