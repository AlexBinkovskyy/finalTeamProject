import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import 'modern-normalize';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Provider> */}
    {/* <BrowserRouter basename="/finalTeamProject"> */}
    <App />
    {/* </BrowserRouter>
    </Provider> */}
  </React.StrictMode>
);
