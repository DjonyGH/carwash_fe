import { ENotificationType, openNotification } from '../../../utils/notifire'
import { EGeneralAction, ISetErrorAction, ISetIsLoadingAction } from './types'

export const generalActionCreator = {
  setIsLoading: (isLoading: boolean): ISetIsLoadingAction => ({
    type: EGeneralAction.SET_IS_LOADING,
    payload: isLoading,
  }),
  setError: (error: string): ISetErrorAction => {
    openNotification(ENotificationType.error, error)
    return { type: EGeneralAction.SET_ERROR, payload: error }
  },
}
