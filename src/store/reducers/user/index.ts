import { IUser } from '../../../types'
import { IUserState, TUserAction, EUserAction } from './types'

const initialState: IUserState = {
  user: {
    name: 'Василий',
    birthday: '2000-01-12',
    email: 'test@mail.ru',
    hasPassword: true,
  } as IUser,
}

export default function userReducer(state = initialState, action: TUserAction): IUserState {
  switch (action.type) {
    case EUserAction.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}
