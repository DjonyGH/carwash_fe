import { IUser, IUserCar } from '../../../types'
import { IUserState, TUserAction, EUserAction } from './types'

const initialState: IUserState = {
  user: {} as IUser,
  userCars: [] as IUserCar[],
}

export default function userReducer(state = initialState, action: TUserAction): IUserState {
  switch (action.type) {
    case EUserAction.SET_USER:
      return { ...state, user: action.payload }
    case EUserAction.SET_USER_CARS:
      return { ...state, userCars: action.payload }

    default:
      return state
  }
}
