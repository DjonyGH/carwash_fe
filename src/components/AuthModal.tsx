import React, { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button, Modal, Row, Form, Input } from 'antd'
import MaskedInput from 'antd-mask-input'

import { authActionCreator } from '../store/reducers/auth/action-creators'
import { IAuthBody } from '../store/reducers/auth/types'
import { prepareLogin } from '../utils/prepareLogin'
import { useTypedSelector } from '../hooks/useTypedSelector'

interface IAuthModalProps {
  isModalVisible: boolean
  setIsModalVisible: (value: boolean) => void
}

const AuthModal: FC<IAuthModalProps> = ({ isModalVisible, setIsModalVisible }) => {
  const { isAuth } = useTypedSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const [phone, setPhone] = useState<string>('')

  const authForm = useRef(null)

  useEffect(() => {
    isAuth && setIsModalVisible(false)
  }, [isAuth]) //eslint-disable-line

  const handleValuesChange = (e: any) => {
    e.login && setPhone(prepareLogin(e.login))
  }

  const login = (e: IAuthBody) => {
    dispatch(authActionCreator.login(prepareLogin(e.login), e.password))
  }

  const prefixSelector = <Form.Item noStyle>+7</Form.Item>
  return (
    <Modal
      title='Авторизация'
      visible={isModalVisible}
      footer={null}
      closable={false}
      onCancel={() => setIsModalVisible(false)}
    >
      <Form ref={authForm} name='auth' layout='vertical' onFinish={login} onValuesChange={handleValuesChange}>
        <Form.Item
          label='Номер телефона'
          name='login'
          validateTrigger='onBlur'
          rules={[
            { required: true, message: 'Введите номер телефона' },
            { len: 13, message: 'Длина должна быть 10 символов' },
          ]}
        >
          <MaskedInput addonBefore={prefixSelector} mask='111 111 11 11' placeholder='___ ___ __ __' name='card' />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          validateTrigger='onBlur'
          rules={[
            { required: true, message: 'Введите пароль' },
            { min: 6, message: 'Длина пароля должна быть не менее 6 символов' },
          ]}
        >
          <Input.Password placeholder='Введите пароль' />
        </Form.Item>

        <Form.Item>
          <Row justify={'space-between'}>
            <Button type='primary' htmlType='submit'>
              Войти
            </Button>
            <Button
              className='ml_10'
              disabled={phone.length !== 10}
              onClick={() => {
                console.log('Получить одноразовый пароль')
              }}
            >
              Одноразовый пароль по СМС
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AuthModal
