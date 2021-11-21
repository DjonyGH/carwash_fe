import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ERoutes, publicRoutes, privatRoutes } from './router'
import { authActionCreator } from './store/reducers/auth/action-creators'
import './App.scss'
import Header from './components/Header'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useTypedSelector } from './hooks/useTypedSelector'

function App() {
  const { isAuth } = useTypedSelector((state) => state.authReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActionCreator.checkAuth())
  }, []) //eslint-disable-line

  return (
    <div className='App'>
      <Header />
      <div className='content'>
        <PerfectScrollbar>
          <Switch>
            {publicRoutes.map((route) => (
              <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
            ))}
            {isAuth &&
              privatRoutes.map((route) => (
                <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
              ))}
            {privatRoutes.map((route) => (
              <Route path={route.path} component={route.component} exact={route.exact} key={route.path}>
                <Redirect to={ERoutes.NOT_FOUND} />
              </Route>
            ))}
            <Redirect to={ERoutes.NOT_FOUND} />
          </Switch>
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default App
