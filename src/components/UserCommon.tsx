import React, { FC, useEffect, useState } from 'react'
import moment from 'moment'
import { Row, Form, Input, Button, DatePicker, Radio } from 'antd'
import { EMode, IUser } from '../types'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useDispatch } from 'react-redux'
import { userActionCreator } from '../store/reducers/user/action-creators'

const UserCommon: FC = () => {
  const { user } = useTypedSelector((state) => state.userReducer)
  const [mode, setMode] = useState<EMode>(EMode.view)

  const [userForm] = Form.useForm()

  const dispatch = useDispatch()

  useEffect(() => {
    userForm.setFieldsValue({ ...user, birthday: user.birthday ? moment(user.birthday, 'DD.MM.YYYY') : undefined })
  }, [userForm, user])

  const submitProfile = (e: any) => {
    // console.log('submit e', e)
    // console.log('submit', e.birthday.format('DD.MM.YYYY'))
    const updatedUser: IUser = {
      ...e,
      birthday: e.birthday.format('DD.MM.YYYY'),
    }
    console.log('updatedUser', updatedUser)
    const response = dispatch(userActionCreator.changeUserInfo(updatedUser))
    !!response && setMode(EMode.view)
  }

  return (
    <>
      <Row>Личный кабинет</Row>
      <Row justify={'center'}>
        <Form
          style={{ width: '600px' }}
          form={userForm}
          name='profile'
          layout='vertical'
          onFinish={submitProfile}
          initialValues={{ ...user, birthday: user.birthday ? moment(user.birthday, 'DD.MM.YYYY') : undefined }}
        >
          <Form.Item
            label='Имя'
            name='name'
            validateTrigger='onBlur'
            rules={[{ min: 2, message: 'Длина должна быть не менее 2 символов' }]}
          >
            <Input placeholder='Введите имя' disabled={mode === EMode.view} />
          </Form.Item>

          <Form.Item label='Дата рождения' name='birthday'>
            <DatePicker
              placeholder='Выберите дату'
              format='DD.MM.YYYY'
              allowClear={false}
              disabled={mode === EMode.view}
            />
          </Form.Item>

          <Form.Item label='Пол' name='gender'>
            <Radio.Group disabled={mode === EMode.view}>
              <Radio.Button value='MALE'>Мужчина</Radio.Button>
              <Radio.Button value='FEMALE'>Женщина</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item name='email' label='Email' validateTrigger='onBlur' rules={[{ type: 'email' }]}>
            <Input placeholder='Введите Email' disabled={mode === EMode.view} />
          </Form.Item>

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
    </>
  )
}

export default UserCommon
