import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.scss'
import { ERoutes, publicRoutes } from './router'
import { authActionCreator } from './store/reducers/auth/action-creators'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authActionCreator.checkAuth())
  }, []) //eslint-disable-line

  return (
    <div className='App'>
      <Switch>
        {publicRoutes.map((route) => (
          <Route path={route.path} component={route.component} exact={route.exact} key={route.path} />
        ))}
        <Redirect to={ERoutes.NOT_FOUND} />
      </Switch>
    </div>
  )
}

export default App
