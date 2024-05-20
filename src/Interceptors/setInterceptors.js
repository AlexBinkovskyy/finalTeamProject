import { store } from '../redux/store';
import { tokenIsInvalid } from '../redux/auth/slice';
import { createBrowserHistory } from 'history';
import api from './api';

const history = createBrowserHistory();

const setInterceptors = () => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        if (error.response.status === 401 
          // || error.response.status === 500
        ) {
          console.log('Error');
          console.log(error);
          store.dispatch(tokenIsInvalid());
          history.push('/finalTeamProject/signin');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setInterceptors;
