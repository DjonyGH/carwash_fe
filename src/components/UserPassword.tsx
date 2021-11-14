import React, { FC } from 'react'
import { Row, Form, Input, Button } from 'antd'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { userActionCreator } from '../store/reducers/user/action-creators'

const UserPassword: FC = () => {
  const { user } = useTypedSelector((state) => state.userReducer)

  const dispatch = useDispatch()

  const [userPasswordForm] = Form.useForm()

  const onSubmit = async (e: { password: string }) => {
    const responce = await dispatch(userActionCreator.createPassword(e.password))
    !!responce && userPasswordForm.resetFields()
  }

  return (
    <>
      <Row>Пароль</Row>
      <Row justify={'center'}>
        <Form style={{ width: '600px' }} form={userPasswordForm} name='password' layout='vertical' onFinish={onSubmit}>
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

export default UserPassword
