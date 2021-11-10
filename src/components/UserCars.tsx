import React, { FC, useEffect, useState } from 'react'
import { Row, Form, Input, Button, Space, Select } from 'antd'
import { MinusCircleOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import { EMode } from '../pages/profile/types'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { userActionCreator } from '../store/reducers/user/action-creators'

const UserCars: FC = () => {
  const { userCars } = useTypedSelector((state) => state.userReducer)
  const [mode, setMode] = useState<EMode>(EMode.view)
  const [editCarId, setEditCarId] = useState<string | undefined>(undefined)

  const [userCarsForm] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActionCreator.fetchUserCars())
  }, []) //eslint-disable-line

  useEffect(() => {
    userCarsForm.setFieldsValue({ cars: userCars })
  }, [userCarsForm, userCars])

  const addNewCar = (add: () => void) => {
    setMode(EMode.edit)
    setEditCarId(undefined)
    add()
  }

  const editCar = (row: number) => {
    setMode(EMode.edit)
    setEditCarId(userCars[row]._id)
  }

  const deleteCar = (name: number, remove: (name: number) => void) => {
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
  }

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
                      >
                        <Select.Option value='BMW'>BMW</Select.Option>
                        <Select.Option value='Lada'>Lada</Select.Option>
                        <Select.Option value='Audi'>Audi</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'model']}
                      fieldKey={[fieldKey, 'model']}
                      rules={[{ required: true, message: 'Выберите молель' }]}
                    >
                      <Input
                        placeholder='Модель'
                        disabled={mode === EMode.view || (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id)}
                      />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                      rules={[{ required: true, message: 'Выберите тип' }]}
                    >
                      <Input
                        placeholder='Тип кузова'
                        disabled={mode === EMode.view || (userCars[fieldKey] && editCarId !== userCars[fieldKey]._id)}
                      />
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
                      <MinusCircleOutlined onClick={() => deleteCar(name, remove)} />
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
                      dispatch(userActionCreator.setUserCars([...userCars]))
                      setMode(EMode.view)
                    }}
                  >
                    Отмена
                  </Button>
                </>
              )}
              {/* {mode === EMode.view && (
                <Button type='primary' htmlType='submit' onClick={() => setMode(EMode.edit)}>
                  Редактировать
                </Button>
              )} */}
            </Row>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default UserCars
