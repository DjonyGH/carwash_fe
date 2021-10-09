import { Button, Modal, Row, Form, Input } from 'antd'
import MaskedInput from 'antd-mask-input'

import React, { FC, useState } from 'react'
import styles from './mainPage.module.scss'

const MainPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const prefixSelector = <Form.Item noStyle>+7</Form.Item>
  return (
    <div>
      <Row justify={'end'} className={styles.header}>
        <Button type='primary'>Записаться</Button>
        <Button type='primary' className={styles.ml_10}>
          Личный кабинет
        </Button>
        <Button type='primary' className={styles.ml_10}>
          О нас
        </Button>
        <Button type='primary' className={styles.ml_10} onClick={() => setIsModalVisible(true)}>
          Войти
        </Button>
        <Button type='primary' className={styles.ml_10}>
          Выйти
        </Button>
      </Row>
      <Modal
        title='Авторизация'
        visible={isModalVisible}
        footer={null}
        closable={false}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form name='auth' layout='vertical' onFinish={(e) => console.log('>>', e)}>
          <Form.Item
            label='Номер телефона'
            name='login'
            rules={[{ required: true, message: 'Введите номер телефона' }]}
          >
            <MaskedInput addonBefore={prefixSelector} mask='111 111 11 11' placeholder='___ ___ __ __' name='card' />
          </Form.Item>

          <Form.Item label='Пароль' name='password' rules={[{ required: true, message: 'Введите пароль' }]}>
            <Input.Password placeholder='Введите пароль' />
          </Form.Item>

          <Form.Item>
            <Row justify={'space-between'}>
              <Button type='primary' htmlType='submit'>
                Войти
              </Button>
              <Button className={styles.ml_10} onClick={() => console.log('Получить одноразовый пароль')}>
                Одноразовый пароль по СМС
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default MainPage
