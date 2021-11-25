import React, { FC } from 'react'

import { Row } from 'antd'

const NoAccessPage: FC = () => {
  return (
    <>
      <Row>Страница доступна только для авторизованных пользователей</Row>
    </>
  )
}

export default NoAccessPage
