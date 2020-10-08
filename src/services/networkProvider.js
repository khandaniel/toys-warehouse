import Cookies from 'universal-cookie';
import { baseUrl } from '../config';

const initialSettings = {
  headers: { 'content-type': 'application/json' },
};
const cookie = new Cookies();

const requestApi = async (route, data = null, method = 'GET', settings = {}) => {
  try {
    const token = cookie.get('token');
    const response = await fetch([baseUrl, route].join('/'), {
      ...initialSettings,
      ...settings,
      headers: {
        ...initialSettings.headers,
        ...settings.headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
      method,
      body: ['GET', 'DELETE'].includes(method) ? null : JSON.stringify(data),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};

export default requestApi;
