import React, { FC, useEffect, useState } from 'react'
import { Row, Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { EMode } from '../pages/profile/types'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { userActionCreator } from '../store/reducers/user/action-creators'
import { carActionCreator } from '../store/reducers/car/action-creators'
import { IUserCar } from '../types'

const UserCars: FC = () => {
  const { userCars } = useTypedSelector((state) => state.userReducer)
  const { brands, models, types } = useTypedSelector((state) => state.carReducer)
  const [mode, setMode] = useState<EMode>(EMode.view)
  const [editCarId, setEditCarId] = useState<string | undefined>(undefined)
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined)
  const [sourceUserCars, setSourceUserCars] = useState<IUserCar[]>([])

  const [userCarsForm] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActionCreator.fetchUserCars())
    dispatch(carActionCreator.fetchBrands())
  }, []) //eslint-disable-line

  useEffect(() => {
    setSourceUserCars(JSON.parse(JSON.stringify(userCars)))
    userCarsForm.setFieldsValue({ cars: userCars })
  }, [userCarsForm, userCars.length]) //eslint-disable-line

  const addNewCar = (add: () => void) => {
    setMode(EMode.edit)
    setEditCarId(undefined)
    add()
  }

  const editCar = (row: number) => {
    setSelectedBrand(userCars[row].brand)
    dispatch(carActionCreator.fetchModels(userCars[row].brand))
    dispatch(carActionCreator.fetchTypes(userCars[row].brand, userCars[row].model))
    setMode(EMode.edit)
    setEditCarId(userCars[row]._id)
  }

  const deleteCar = (name: number) => {
    setMode(EMode.view)
    setEditCarId(undefined)
    dispatch(userActionCreator.deleteUserCar(userCars[name]._id))
  }

  const submitCars = (e: any) => {
    setMode(EMode.view)
    if (editCarId) {
      dispatch(userActionCreator.updateUserCar(e.cars[0]))
    } else {
      dispatch(userActionCreator.createUserCar(e.cars[e.cars.length - 1]))
    }
    dispatch(carActionCreator.clearModelsAndTypes())
  }

  console.log('sourceUserCars', sourceUserCars)

  return (
    <>
      <Row>Автомобили</Row>
      <Row justify={'center'}>
        <Form
          style={{ width: '600px' }}
          form={userCarsForm}
          name='cars'
          layout='vertical'
          onFinish={submitCars}
          initialValues={{ cars: userCars }}
        >
          <Form.List name='cars'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                    <Form.Item
                      {...restField}
                      name={[name, 'brand']}
                      fieldKey={[fieldKey, 'brand']}
                      rules={[{ required: true, message: 'Выберите марку' }]}
                    >
                      <Select
                        placeholder='Марка'
                        disabled={mode === EMode.view || (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id)}
                        style={{ width: '130px' }}
                        onSelect={(e: string) => {
                          setSelectedBrand(e)
                          if (userCars[fieldKey]) {
                            userCars[fieldKey].brand = e
                            userCars[fieldKey].model = ''
                            userCars[fieldKey].type = ''
                            userCarsForm.setFieldsValue({ cars: userCars })
                          }
                          dispatch(carActionCreator.fetchModels(e))
                        }}
                      >
                        {brands.map((brand) => (
                          <Select.Option value={brand} key={brand}>
                            {brand}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'model']}
                      fieldKey={[fieldKey, 'model']}
                      rules={[{ required: true, message: 'Выберите модель' }]}
                    >
                      <Select
                        placeholder='Модель'
                        disabled={
                          mode === EMode.view ||
                          (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id) ||
                          !models.length
                        }
                        style={{ width: '130px' }}
                        onSelect={(e: string) => {
                          if (userCars[fieldKey]) {
                            userCars[fieldKey].model = e
                            userCars[fieldKey].type = ''
                            userCarsForm.setFieldsValue({ cars: userCars })
                          }
                          selectedBrand && dispatch(carActionCreator.fetchTypes(selectedBrand, e))
                        }}
                      >
                        {models.map((model) => (
                          <Select.Option value={model} key={model}>
                            {model}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                      rules={[{ required: true, message: 'Выберите тип' }]}
                    >
                      <Select
                        placeholder='Тип кузова'
                        disabled={
                          mode === EMode.view ||
                          (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id) ||
                          !types.length
                        }
                        style={{ width: '130px' }}
                      >
                        {types.map((type) => (
                          <Select.Option value={type} key={type}>
                            {type}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'number']}
                      fieldKey={[fieldKey, 'number']}
                      rules={[{ required: true, message: 'Введите гос.номер' }]}
                    >
                      <Input
                        placeholder='Гос.номер'
                        disabled={mode === EMode.view || (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id)}
                      />
                    </Form.Item>
                    {mode === EMode.edit && userCars[fieldKey] && editCarId === userCars[fieldKey]._id && (
                      <MinusCircleOutlined onClick={() => deleteCar(name)} />
                    )}
                    {mode === EMode.view && (
                      <Button type='text' onClick={() => editCar(fieldKey)} block icon={<EditOutlined />} />
                    )}
                  </Space>
                ))}
                {mode === EMode.view && (
                  <Form.Item>
                    <Button type='dashed' onClick={() => addNewCar(add)} block icon={<PlusOutlined />}>
                      Добавить автомобиль
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>

          <Form.Item>
            <Row justify={'space-between'}>
              {mode === EMode.edit && (
                <>
                  <Button type='primary' htmlType='submit'>
                    Сохранить
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(userActionCreator.setUserCars([...sourceUserCars]))
                      setMode(EMode.view)
                      dispatch(carActionCreator.clearModelsAndTypes())
                    }}
                  >
                    Отмена
                  </Button>
                </>
              )}
            </Row>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default UserCars
