import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Row } from 'antd'

import AuthModal from './AuthModal'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { authActionCreator } from '../store/reducers/auth/action-creators'
import { ERoutes } from '../router'

const Header: FC = () => {
  const { isAuth } = useTypedSelector((state) => state.authReducer)
  const { user } = useTypedSelector((state) => state.userReducer)
  const dispatch = useDispatch()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<ERoutes>(ERoutes.HEAD)

  const router = useHistory()

  useEffect(() => {
    router.location.pathname === ERoutes.NOT_FOUND && setCurrentPage(router.location.pathname)
  }, [router.location.pathname])

  const changePage = (page: ERoutes) => {
    setCurrentPage(page)
    router.push(page)
  }

  const checkPage = (page: ERoutes) => {
    return currentPage !== page
  }

  return (
    <>
      <Row justify={'end'} align={'middle'} className='header'>
        {isAuth && <div>{user.login}</div>}
        {checkPage(ERoutes.HEAD) && (
          <Button type='primary' onClick={() => changePage(ERoutes.HEAD)}>
            Главная
          </Button>
        )}
        {checkPage(ERoutes.ORDER) && (
          <Button type='primary' className='ml_10' onClick={() => changePage(ERoutes.ORDER)}>
            Записаться
          </Button>
        )}
        {checkPage(ERoutes.PROFILE) && (
          <Button type='primary' className='ml_10' onClick={() => changePage(ERoutes.PROFILE)}>
            Личный кабинет
          </Button>
        )}
        {checkPage(ERoutes.ABOUT_US) && (
          <Button type='primary' className='ml_10' onClick={() => changePage(ERoutes.ABOUT_US)}>
            О нас
          </Button>
        )}
        {!isAuth && (
          <Button type='primary' className='ml_10' onClick={() => setIsModalVisible(true)}>
            Войти
          </Button>
        )}
        {isAuth && (
          <Button type='primary' className='ml_10' onClick={() => dispatch(authActionCreator.logout())}>
            Выйти
          </Button>
        )}
      </Row>
      <AuthModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  )
}

export default Header
