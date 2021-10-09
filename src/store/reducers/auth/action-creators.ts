import { TAppDispatch } from '../..'
import { EAuthAction, ISetIsAuthAction } from './types'
import { generalActionCreator } from '../general/action-creators'

export const authActionCreator = {
  setIsAuth: (isAuth: boolean): ISetIsAuthAction => ({
    type: EAuthAction.SET_IS_AUTH,
    payload: isAuth,
  }),
  login: (login: string, pass: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('LOGIN', login, pass)
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
