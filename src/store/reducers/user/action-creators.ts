import { TAppDispatch, TRootState } from '../..'
import { EUserAction, ISetUserAction, ISetUserCarsAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import { IUser, IUserCar } from '../../../types'
import http from '../../../utils/http'
import { AxiosResponse } from 'axios'
import { ENotificationType, openNotification } from '../../../utils/notifire'

export const userActionCreator = {
  setUser: (user: IUser): ISetUserAction => ({
    type: EUserAction.SET_USER,
    payload: user,
  }),
  createPassword: (password: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('CREATE PASSWORD')
      await http.post('/users/set-password', { password })
      openNotification(ENotificationType.success, 'Пароль успешно сохранен')
      return true
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
      openNotification(ENotificationType.success, 'Данные пользователя успешно изменены')
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  setUserCars: (userCars: IUserCar[]): ISetUserCarsAction => ({
    type: EUserAction.SET_USER_CARS,
    payload: userCars,
  }),
  fetchUserCars: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('FETSH USER CARS')
      const { data } = await http.get('/user-car')
      dispatch(userActionCreator.setUserCars(data))
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  createUserCar: (newUserCar: IUserCar) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('CREATE USER CAR')
      const { data } = await http.post<IUserCar, AxiosResponse<IUserCar>>('/user-car', newUserCar)

      const { userCars } = getState().userReducer

      userCars.push(data)

      dispatch(userActionCreator.setUserCars(userCars))
      openNotification(ENotificationType.success, 'Автомобиль успешно добалвен')
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  updateUserCar: (newUserCar: IUserCar) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('UPDATE USER CAR')
      const { data } = await http.put<IUserCar, AxiosResponse<IUserCar[]>>('/user-car', newUserCar)
      dispatch(userActionCreator.setUserCars(data))
      openNotification(ENotificationType.success, 'Данные автомобиля успешно изменены')
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  deleteUserCar: (userCarId: string) => async (dispatch: TAppDispatch, getState: () => TRootState) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('DELETE USER CAR')
      await http.delete(`/user-car?id=${userCarId}`)

      const { userCars } = getState().userReducer

      const newUserCars = userCars.filter((car) => car._id !== userCarId)

      dispatch(userActionCreator.setUserCars(newUserCars))
      openNotification(ENotificationType.success, 'Автомобиль успешно удален')
    } catch (error: any) {
      dispatch(generalActionCreator.setError(String(error.response.data.message)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
