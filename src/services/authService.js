import requestApi from './networkProvider';

export const requestLogin = (email, password) => requestApi('login', { email, password }, 'POST');

export const getProfile = () => requestApi('profile');
