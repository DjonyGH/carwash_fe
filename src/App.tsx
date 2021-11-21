import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ERoutes, publicRoutes } from './router'
import { authActionCreator } from './store/reducers/auth/action-creators'
import './App.scss'
import Header from './components/Header'
import PerfectScrollbar from 'react-perfect-scrollbar'

function App() {
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
            <Redirect to={ERoutes.NOT_FOUND} />
          </Switch>
        </PerfectScrollbar>
      </div>
    </div>
  )
}

export default App
