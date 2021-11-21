import React from 'react'
import MainPage from '../pages/main/MainPage'
import ProfilePage from '../pages/profile/ProfilePage'
import NoFoundPage from '../pages/notFound/NotFoundPage'
import GaragePage from '../pages/garage/GaragePage'
import OrderPage from '../pages/order/OrderPage'
import AboutUsPage from '../pages/aboutUs/AboutUsPage'

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
    path: ERoutes.ORDER,
    component: OrderPage,
    exact: true,
  },
  {
    path: ERoutes.ABOUT_US,
    component: AboutUsPage,
    exact: true,
  },
  {
    path: ERoutes.NOT_FOUND,
    component: NoFoundPage,
  },
]

export const privatRoutes: IRoute[] = [
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
]
