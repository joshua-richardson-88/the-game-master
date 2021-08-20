import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import SignUp from './features/authentication/SignUp'
import SignIn from './features/authentication/SignIn'
import PrivateRoute from './features/authentication/PrivateRoute'
import ForgotPassword from './features/authentication/ForgotPassword'
import LandingPage from './common/LandingPage'
import { AuthProvider } from './contexts/AuthContext'

const useStyles = makeStyles({
  page: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
  },
})

function App() {
  const classes = useStyles()

  return (
    <Router>
      <AuthProvider>
        <div className={classes.page}>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            {/* <PrivateRoute exact path='/' component={LandingPage} /> */}
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={SignIn} />
            <Route path='/forgot-password' component={ForgotPassword} />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
