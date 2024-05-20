import { store } from '../redux/store';
import { tokenIsInvalid } from '../redux/auth/slice';
import { createBrowserHistory } from 'history';

import Cookies from 'js-cookie';
import api from './api';
import { setAuthHeader } from '../redux/auth/operations';

const history = createBrowserHistory();

const setInterceptors = () => {
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response) {
        // eslint-disable-next-line
        if (error.response.status == 401 || error.response.status == 500) {
          const originalRequest = error.config;
          const refreshToken = Cookies.get('refreshToken');
          try {
            const result = await api.post('/users/refreshtoken', {
              refreshToken,
            }, {withCredentials: true});
            const newAccessToken = result.data.accessToken;
            setAuthHeader(newAccessToken);
            originalRequest.headers[
              'Authorization'
            ] = `Bearer ${newAccessToken}`;
            return api.request(originalRequest);
          } catch (error) {
            console.log(error);
          }

          store.dispatch(tokenIsInvalid());
          history.push('/finalTeamProject/signin');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setInterceptors;
