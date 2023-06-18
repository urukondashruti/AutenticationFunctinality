// Write your JS code here
import './index.css'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

const Login = props => {
  const jwt = Cookies.get('jwt_token')
  if (jwt !== undefined) {
    return <Redirect to="/" />
  }

  const setCookiesAndNavigateToHome = token => {
    const {history} = props
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  const onClickLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      setCookiesAndNavigateToHome(data.jwt_token)
    }
  }

  return (
    <div>
      <h1>Please Login</h1>
      <button type="button" onClick={onClickLogin}>
        Login with sample Creds
      </button>
    </div>
  )
}

export default Login
