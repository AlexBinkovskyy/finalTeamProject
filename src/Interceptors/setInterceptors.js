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
        // eslint-disable-next-line
        if (error.response.status == 401 || error.response.status == 500) {
          const originalRequest = error.config;

          const token = originalRequest.headers.Authorization.split(' ')[1];

          const id = jwtDecode(token);
          const refreshToken = localStorage.getItem(`userId_${id.id}`);
          const result = await store
            .dispatch(refreshUserTokens({ refreshToken }))
            .unwrap()
            .then(item => {
              const newAccessToken = item.data.accessToken;
              const newRefreshToken = item.data.refreshToken;
              localStorage.setItem(`userId_${id.id}`, newRefreshToken);

              setAuthHeader(newAccessToken);
              originalRequest.headers[
                'Authorization'
              ] = `Bearer ${newAccessToken}`;

              return api.request(result);
            });
        }
        store.dispatch(tokenIsInvalid());
        history.push('/finalTeamProject/signin');
      }
      return Promise.reject(error);
    }
  );
};

export default setInterceptors;
