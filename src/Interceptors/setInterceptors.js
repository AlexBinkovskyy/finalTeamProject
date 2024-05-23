import { tokenIsInvalid } from '../redux/auth/slice';
import { createBrowserHistory } from 'history';
import api from './api';
import { refreshUserTokens, setAuthHeader } from '../redux/auth/operations';
import { jwtDecode } from 'jwt-decode';
import { store } from '../redux/store';

const history = createBrowserHistory();

const setInterceptors = () => {
  api.interceptors.response.use(
    response => response,
    async error => {
      if (error.response) {
        eslint-disable-next-line
        if (error.response.status === 401 || error.response.status === 500) {
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
