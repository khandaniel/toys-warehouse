import Cookies from 'universal-cookie';

import { getProfile, requestLogin } from '../../services/authService';

export const login = (email, password) => (dispatch) => {
  dispatch({
    type: 'AUTH_START',
  });

  requestLogin(email, password).then((loginResult) => {
    if (loginResult.accessToken) {
      const expires = new Date(Date.now() + 86400000);
      const cookies = new Cookies();
      cookies.set('token', loginResult.accessToken, { expires });
      dispatch({
        type: 'AUTH_SUCCESS',
        token: loginResult.accessToken,
      });
    } else {
      dispatch({
        type: 'AUTH_FAIL',
        error: loginResult.message,
      });
    }

    dispatch({
      type: 'AUTH_FINISH',
    });
  });
};

export const logout = (token) => (dispatch) => {
  const cookies = new Cookies();
  if (cookies.get('token') === token) cookies.remove('token');
  dispatch({ type: 'AUTH_DISCARD' });
};

export const updateForm = (fields) => ({
  type: 'UPDATE_FORM',
  fields,
});

export const loadProfile = () => (dispatch) => {
  getProfile().then(({ id, email }) => {
    dispatch({
      type: 'PROFILE_RECEIVED',
      profile: { id, email },
    });
  });
};
