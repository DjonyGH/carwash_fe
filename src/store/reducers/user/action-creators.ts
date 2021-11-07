import { TAppDispatch } from '../..'
import { EUserAction, ISetUserAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import { IUser } from '../../../types'
import http from '../../../utils/http'

export const userActionCreator = {
  setUser: (user: IUser): ISetUserAction => ({
    type: EUserAction.SET_USER,
    payload: user,
  }),
  createPassword: (pass: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('CREATE PASSWORD', pass)
      await http.post('/create-password', { pass })
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  changeUserInfo: (user: IUser) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('CHANGE USER iNFO', user)
      await http.put('/change-user-info', { user })
      dispatch(userActionCreator.setUser(user))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
