import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import {
  Button, FormLabel, TextField, CircularProgress,
} from '@material-ui/core';
import { login as loginAction, logout as logoutAction, updateForm } from '../../store/actions/authActions';

import './AuthScreen.css';
import { routes } from '../../config';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const style = {
  textField: {
    width: 400,
    justifyContent: 'center',
  },
  actionButton: {
    marginTop: 20,
  },
};

function AuthScreen({ logout }) {
  const dispatch = useDispatch();
  const query = useQuery();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);
  const login = useSelector((state) => state.auth.form.email);
  const password = useSelector((state) => state.auth.form.password);
  const loading = useSelector((state) => state.auth.loading);

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch(loginAction(login, password));
  }, [dispatch, login, password]);

  const onFieldChange = useCallback(({ target }) => {
    dispatch(updateForm({ [target.name]: target.value }));
  }, [dispatch]);

  if (logout) {
    const externalToken = query.get('token');

    if (externalToken === token) {
      dispatch(logoutAction(externalToken));
    }

    return <Redirect to={routes.base} />;
  }

  if (token) {
    return <Redirect to={routes.base} />;
  }

  return (
    <div className="LoginFormContainer">
      <form className="LoginForm" onSubmit={onFormSubmit}>
        <FormLabel>Sign In</FormLabel>
        <TextField
          style={style.textField}
          type="email"
          name="email"
          label="Email"
          value={login}
          onChange={onFieldChange}
        />
        <TextField
          style={style.textField}
          type="password"
          name="password"
          label="Password"
          value={password}
          error={!!error}
          helperText={!!error && error}
          onChange={onFieldChange}
        />
        <Button
          type="submit"
          style={style.actionButton}
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress /> : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}

export default AuthScreen;

AuthScreen.defaultProps = {
  logout: false,
};

AuthScreen.propTypes = {
  logout: PropTypes.bool,
};
