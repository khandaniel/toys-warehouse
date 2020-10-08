import Cookies from 'universal-cookie';
import { baseUrl } from '../config';

const initialSettings = {
  headers: { 'content-type': 'application/json' },
};
const cookie = new Cookies();

const requestApi = async (route, data = null, method = 'GET', settings = {}) => {
    const token = cookie.get('token');
    return  fetch([baseUrl, route].join('/'), {
      ...initialSettings,
      ...settings,
      headers: {
        ...initialSettings.headers,
        ...settings.headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
      method,
      body: ['GET', 'DELETE'].includes(method) ? null : JSON.stringify(data),
    })
      .then((response) => response.json());
};

export default requestApi;
