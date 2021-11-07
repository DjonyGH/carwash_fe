import React, {
  FC,
  useRef,
  useState,
  // useState
} from 'react'
import moment from 'moment'
// import { useDispatch } from 'react-redux'

import { Row, Form, Input, Button, DatePicker, Radio, Space } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { EMode } from './types'

import { useTypedSelector } from '../../hooks/useTypedSelector'
// import { authActionCreator } from '../../store/reducers/auth/action-creators'
// import styles from './ProfilePage.module.scss'

const ProfilePage: FC = () => {
  // const { isAuth } = useTypedSelector((state) => state.authReducer)
  const { user } = useTypedSelector((state) => state.userReducer)
  // const dispatch = useDispatch()
  const [mode, setMode] = useState<EMode>(EMode.view)
  const profileForm = useRef(null)

  // const name = 'Vasya'
  // const name = undefined

  return (
    <>
      <Row>Личный кабинет</Row>
      <Row justify={'center'}>
        <Form
          style={{ width: '600px' }}
          ref={profileForm}
          name='profile'
          layout='vertical'
          onFinish={(e) => console.log('submit', e)}
        >
          <Form.Item
            label='Имя'
            name='name'
            validateTrigger='onBlur'
            rules={[{ min: 2, message: 'Длина должна быть не менее 2 символов' }]}
          >
            <Input placeholder='Введите имя' defaultValue={user.name} disabled={mode === EMode.view} />
          </Form.Item>

          <Form.Item label='Дата рождения' name='birthday'>
            <DatePicker
              placeholder='Выберите дату'
              format='DD.MM.YYYY'
              defaultValue={user.birthday ? moment(user.birthday, 'YYYY-MM-DD') : undefined}
              disabled={mode === EMode.view}
            />
          </Form.Item>

          <Form.Item label='Пол' name='gender'>
            <Radio.Group disabled={mode === EMode.view}>
              <Radio.Button value='male'>Мужчина</Radio.Button>
              <Radio.Button value='female'>Женщина</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name='email' label='Email' validateTrigger='onBlur' rules={[{ type: 'email' }]}>
            <Input placeholder='Введите Email' defaultValue={user.email} disabled={mode === EMode.view} />
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
                      <Input placeholder='Марка' disabled={mode === EMode.view} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name='model'
                      fieldKey={[fieldKey, 'model']}
                      rules={[{ required: true, message: 'Выберите молель автомобиля' }]}
                    >
                      <Input placeholder='Модель' disabled={mode === EMode.view} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name='carNumber'
                      fieldKey={[fieldKey, 'carNumber']}
                      rules={[{ required: true, message: 'Введите гос.номер автомобиля' }]}
                    >
                      <Input placeholder='Гос.номер' disabled={mode === EMode.view} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                {mode === EMode.edit && (
                  <Form.Item>
                    <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
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
                  <Button htmlType='submit' onClick={() => setMode(EMode.view)}>
                    Отмена
                  </Button>
                </>
              )}
              {mode === EMode.view && (
                <Button type='primary' htmlType='submit' onClick={() => setMode(EMode.edit)}>
                  Редактировать
                </Button>
              )}
            </Row>
          </Form.Item>
        </Form>
      </Row>

      <Row>Пароль</Row>
      <Row justify={'center'}>
        <Form
          style={{ width: '600px' }}
          ref={profileForm}
          name='profile'
          layout='vertical'
          onFinish={(e) => console.log('submit', e)}
        >
          <Form.Item
            label='Пароль'
            name='password'
            validateTrigger='onBlur'
            rules={[{ min: 6, message: 'Длина должна быть не менее 6 символов' }]}
          >
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>
          <Form.Item
            label='Подтверждение пароля'
            name='confirmPassword'
            validateTrigger='onBlur'
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Пароли не совпадают'))
                },
              }),
            ]}
          >
            <Input.Password placeholder='Подтвердите пароль' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              {user.hasPassword ? 'Изменить пароль' : 'Сохранить пароль'}
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  )
}

export default ProfilePage
