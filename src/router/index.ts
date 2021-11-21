import React from 'react'
import MainPage from '../pages/main/MainPage'
import ProfilePage from '../pages/profile/ProfilePage'
import NoFoundPage from '../pages/notFound/NotFoundPage'
import GaragePage from '../pages/garage/GaragePage'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
}
export enum ERoutes {
  HEAD = '/',
  ORDER = '/order',
  PROFILE = '/profile',
  GARAGE = '/garage',
  ABOUT_US = '/about_us',
  NOT_FOUND = '/not-found',
}

export const publicRoutes: IRoute[] = [
  {
    path: ERoutes.HEAD,
    component: MainPage,
    exact: true,
  },
  {
    path: ERoutes.PROFILE,
    component: ProfilePage,
    exact: true,
  },
  {
    path: ERoutes.GARAGE,
    component: GaragePage,
    exact: true,
  },
  {
    path: ERoutes.NOT_FOUND,
    component: NoFoundPage,
  },
]

export const privatRoutes: IRoute[] = []
