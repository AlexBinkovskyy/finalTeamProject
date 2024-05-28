import { useEffect, lazy } from 'react';

import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from '../Routs/PrivateRoute';
import { RestrictedRoute } from '../Routs/RestrictedRoute';

import { refreshUser } from '../redux/auth/operations';
import { useAuth } from '../hooks';
import '../i18/i18n';

import Loader from './Loader/Loader';
import setInterceptors from 'Interceptors/setInterceptors';
import { Layout } from './Layout';

const HomePage = lazy(() => import('../Pages/HomePage/HomePage.jsx'));
const SignInPage = lazy(() => import('../Pages/SignInPage/SignInPage.jsx'));
const SignUpPage = lazy(() => import('../Pages/SignUpPage/SignUpPage.jsx'));
const TrackerPage = lazy(() => import('../Pages/TrackerPage/TrackerPage.jsx'));
const ConfirmPage = lazy(() => import('../Pages/ConfirmPage/ConfirmPage.jsx'));
const ResendPage = lazy(() => import('../Pages/ResendPage/ResendPage.jsx'));
const RecoverPage = lazy(() => import('../Pages/RecoverPage/RecoverPage'));
const ChangePassPage = lazy(() =>
  import('../Pages/ChangePassPage/ChangePassPage.jsx')
);
const NotFoundPage = lazy(() =>
  import('../Pages/NotFoundPage/NotFoundPage.jsx')
);

export const App = () => {
  setInterceptors();

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div>{isRefreshing && <Loader />}</div>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignUpPage />}
              />
            }
          />

          <Route
            path="/signin"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<SignInPage />}
              />
            }
          />

          <Route
            path="/confirm-page"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<ConfirmPage />}
              />
            }
          />

          <Route
            path="/resend-page"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<ResendPage />}
              />
            }
          />

          <Route
            path="/recover-page"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<RecoverPage />}
              />
            }
          />

          <Route
            path="/change-pass-page"
            element={
              <RestrictedRoute
                redirectTo="/tracker"
                component={<ChangePassPage />}
              />
            }
          />

          <Route
            path="/tracker"
            element={
              <PrivateRoute redirectTo="/signin" component={<TrackerPage />} />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};
