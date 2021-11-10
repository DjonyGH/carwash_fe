import { TAppDispatch, TRootState } from '../..'
import { ECarAction, ISetBrandsAction, ISetModelsAction, ISetTypesAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import http from '../../../utils/http'
import { AxiosResponse } from 'axios'
import { ICarBrand, ICarModel, ICarType } from '../../../types'

export const carActionCreator = {
  setBrands: (brands: ICarBrand[]): ISetBrandsAction => ({
    type: ECarAction.SET_BRANDS,
    payload: brands,
  }),
  setModels: (models: ICarModel[]): ISetModelsAction => ({
    type: ECarAction.SET_MODELS,
    payload: models,
  }),
  setTypes: (types: ICarType[]): ISetTypesAction => ({
    type: ECarAction.SET_TYPES,
    payload: types,
  }),
  fetchBrands: () => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('FETSH CAR BRANDS')
      const { data } = await http.get('/car/brands')
      dispatch(carActionCreator.setBrands(data))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchModels: (brand: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('FETSH CAR MODELS')
      const { data } = await http.get(`/car/models?brand=${brand}`)
      dispatch(carActionCreator.setModels(data))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  fetchTypes: (model: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('FETSH CAR TYPES')
      const { data } = await http.get(`/car/types?model=${model}`)
      dispatch(carActionCreator.setTypes(data))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
}
