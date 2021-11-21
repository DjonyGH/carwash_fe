import React, { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import { Button, Row, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'

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
    return currentPage === page
  }

  return (
    <>
      <Row justify={'space-between'} align={'middle'} className='header'>
        <Button type='primary' onClick={() => changePage(ERoutes.HEAD)}>
          LOGO
        </Button>
        <div>
          <Button
            type='primary'
            disabled={checkPage(ERoutes.ORDER)}
            className='ml_10'
            onClick={() => changePage(ERoutes.ORDER)}
          >
            Записаться
          </Button>

          {isAuth && (
            <Button
              type='primary'
              disabled={checkPage(ERoutes.PROFILE)}
              className='ml_10'
              onClick={() => changePage(ERoutes.PROFILE)}
            >
              Личный кабинет
            </Button>
          )}
          {isAuth && (
            <Button
              type='primary'
              disabled={checkPage(ERoutes.GARAGE)}
              className='ml_10'
              onClick={() => changePage(ERoutes.GARAGE)}
            >
              Гараж
            </Button>
          )}

          <Button
            type='primary'
            disabled={checkPage(ERoutes.ABOUT_US)}
            className='ml_10'
            onClick={() => changePage(ERoutes.ABOUT_US)}
          >
            О нас
          </Button>

          {!isAuth && (
            <Button type='primary' className='ml_10' onClick={() => setIsModalVisible(true)}>
              Войти
            </Button>
          )}
          {isAuth && (
            <Tooltip title={user.name || user.login}>
              <Button
                type='primary'
                shape='circle'
                icon={<UserOutlined />}
                className='ml_10'
                onClick={() => dispatch(authActionCreator.logout())}
              />
            </Tooltip>
          )}
        </div>
      </Row>
      <AuthModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </>
  )
}

export default Header
