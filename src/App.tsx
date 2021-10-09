import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.scss'
import { ERoutes, publicRoutes } from './router'

function App() {
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
