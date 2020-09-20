import React, {useState, useCallback} from 'react';
import './LoginScreen.css'
import {
  TextField,
  Button
} from '@material-ui/core';
import { login } from '../../utils/index.js'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPasswordChange = useCallback(e => setPassword(e.target.value), [setPassword])
  const onEmailChange = useCallback(e => setEmail(e.target.value), [setEmail])
  const onFormSubmit = useCallback(() => {
    login(email, password)
  }, [email, password])


  return (
      <form className="LoginScreen" onSubmit={ onFormSubmit }>
        <div className="LoginScreen--field">
          <TextField
            label="Email"
            type="email"
            value={ email }
            onChange={ onEmailChange }
            variant="outlined"
          />
        </div>
        <div className="LoginScreen--field">
          <TextField
            label="Password"
            type="password"
            value={ password }
            onChange={ onPasswordChange }
            variant="outlined"
          />
        </div>
        <Button
          size="large"
          onClick={ onFormSubmit }
        >Log In</Button>
      </form>
  )
}

export default LoginScreen