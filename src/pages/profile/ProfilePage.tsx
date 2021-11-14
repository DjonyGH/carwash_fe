import React, { FC } from 'react'
import UserCars from '../../components/UserCars'
import UserCommon from '../../components/UserCommon'
import UserPassword from '../../components/UserPassword'

const ProfilePage: FC = () => {
  return (
    <>
      <UserCommon />
      <UserCars />
      <UserPassword />
    </>
  )
}

export default ProfilePage
