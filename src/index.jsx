import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { store, persistor } from './redux/store';
import './index.css';
import 'modern-normalize';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './Theme/ThemeContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  //  <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="/finalTeamProject">
        <ThemeProvider>
          <App />
          <ToastContainer
            hideProgressBar={true}
            // transition="Flip"
            position="top-center"
          />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  /* </React.StrictMode> */
);
