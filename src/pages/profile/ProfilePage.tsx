import React, {
  FC,
  useRef,
  // useState
} from 'react'
// import { useDispatch } from 'react-redux'

import { Row, Form, Input, Button, DatePicker, Radio, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

// import { useTypedSelector } from '../../hooks/useTypedSelector'
// import { authActionCreator } from '../../store/reducers/auth/action-creators'
// import styles from './ProfilePage.module.scss'

const ProfilePage: FC = () => {
  // const { isAuth } = useTypedSelector((state) => state.authReducer)
  // const dispatch = useDispatch()
  const profileForm = useRef(null)

  return (
    <>
      <Row>Личный кабинет</Row>
      <Row justify={'center'}>
        <Form
          style={{ width: '600px' }}
          ref={profileForm}
          name='auth'
          layout='vertical'
          // labelCol={{ span: 8 }}
          wrapperCol={{
            span: 24,
            offset: 0,
          }}
          onFinish={(e) => console.log('submit', e)}
        >
          <Form.Item
            label='Имя'
            name='name'
            validateTrigger='onBlur'
            rules={[{ len: 2, message: 'Длина должна быть не менее 2 символов' }]}
          >
            <Input placeholder='Введите имя' />
          </Form.Item>

          <Form.Item label='Дата рождения' name='birthday'>
            <DatePicker placeholder='Выберите дату' />
          </Form.Item>

          <Form.Item label='Пол' name='gender'>
            <Radio.Group>
              <Radio.Button value='small'>Мужчина</Radio.Button>
              <Radio.Button value='default'>Женщина</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name='email' label='Email' validateTrigger='onBlur' rules={[{ type: 'email' }]}>
            <Input placeholder='Введите Email' />
          </Form.Item>

          <Form.List name='cars'>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                    <Form.Item
                      {...restField}
                      name='brand'
                      fieldKey={[fieldKey, 'brand']}
                      rules={[{ required: true, message: 'Выберите марку автомобиля' }]}
                    >
                      <Input placeholder='Марка' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name='model'
                      fieldKey={[fieldKey, 'model']}
                      rules={[{ required: true, message: 'Выберите молель автомобиля' }]}
                    >
                      <Input placeholder='Модель' />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name='carNumber'
                      fieldKey={[fieldKey, 'carNumber']}
                      rules={[{ required: true, message: 'Введите гос.номер автомобиля' }]}
                    >
                      <Input placeholder='Гос.номер' />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                    Добавить автомобиль
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item>
            <Row justify={'space-between'}>
              <Button type='primary' htmlType='submit'>
                Сохранить
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default ProfilePage
