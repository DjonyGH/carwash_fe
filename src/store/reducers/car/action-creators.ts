import { TAppDispatch } from '../..'
import { ECarAction, ISetBrandsAction, ISetModelsAction, ISetTypesAction } from './types'
import { generalActionCreator } from '../general/action-creators'
import http from '../../../utils/http'

export const carActionCreator = {
  setBrands: (brands: string[]): ISetBrandsAction => ({
    type: ECarAction.SET_BRANDS,
    payload: brands,
  }),
  setModels: (models: string[]): ISetModelsAction => ({
    type: ECarAction.SET_MODELS,
    payload: models,
  }),
  setTypes: (types: string[]): ISetTypesAction => ({
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
  fetchTypes: (brand: string, model: string) => async (dispatch: TAppDispatch) => {
    try {
      dispatch(generalActionCreator.setIsLoading(true))
      console.log('FETSH CAR TYPES', brand, model)
      const { data } = await http.get(`/car/types?brand=${brand}&model=${model}`)
      console.log('types responce', data)

      dispatch(carActionCreator.setTypes(data))
    } catch (error) {
      dispatch(generalActionCreator.setError(String(error)))
    } finally {
      dispatch(generalActionCreator.setIsLoading(false))
    }
  },
  clearModelsAndTypes: () => (dispatch: TAppDispatch) => {
    dispatch(carActionCreator.setModels([]))
    dispatch(carActionCreator.setTypes([]))
  },
}
