// import { store } from '../redux/store';
// import { tokenIsInvalid } from '../redux/auth/slice';
import { createBrowserHistory } from 'history';

import Cookies from 'js-cookie';
import api from './api';
import { setAuthHeader } from '../redux/auth/operations';

const history = createBrowserHistory();

const setInterceptors = () => {
  // api.interceptors.request.use(config => {

  //   config.headers['Access-Control-Allow-Origin'] = '*'; // Дозволяє всі джерела
  //   config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'; // Дозволені методи
  //   config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization'; // Дозволені заголовки
  //   return config;
  // });
  
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response) {
        // eslint-disable-next-line
        if (error.response.status == 401 || error.response.status == 500) {
          const originalRequest = error.config;
          if (originalRequest._retry) {
            return Promise.reject(error);
          }
          originalRequest._retry = true;

          console.log(originalRequest);

          const token = originalRequest.headers.Authorization.split(' ')[1];
          const id = jwtDecode(token);
          const refreshToken = localStorage.getItem(`userId_${id.id}`);

          try {
            const { payload } = await store.dispatch(
              refreshUserTokens({ refreshToken })
            );
            console.log('item', payload);

            const newAccessToken = payload.accessToken;
            const newRefreshToken = payload.refreshToken;
            localStorage.setItem(`userId_${id.id}`, newRefreshToken);

            setAuthHeader(newAccessToken);

            console.log('req', originalRequest.headers.Authorization);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            console.log('req2', originalRequest.headers.Authorization);

            return api(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        if (error.response.status === 403) {
          store.dispatch(tokenIsInvalid());
          history.push('/finalTeamProject/signin');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setInterceptors;
