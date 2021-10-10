import React, { FC, useState } from 'react'

import { Button, Row } from 'antd'

import AuthModal from '../../components/AuthModal'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './mainPage.module.scss'

const MainPage: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.authReducer)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  return (
    <div>
      <Row justify={'end'} className={styles.header}>
        <Button type='primary'>Записаться</Button>
        <Button type='primary' className='ml_10'>
          Личный кабинет
        </Button>
        <Button type='primary' className='ml_10'>
          О нас
        </Button>
        {!isAuth && (
          <Button type='primary' className='ml_10' onClick={() => setIsModalVisible(true)}>
            Войти
          </Button>
        )}
        {isAuth && (
          <Button type='primary' className='ml_10'>
            Выйти
          </Button>
        )}
      </Row>
      <AuthModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </div>
  )
}

export default MainPage
