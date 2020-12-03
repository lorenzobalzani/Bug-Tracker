import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './View/App';
import 'bootstrap/dist/css/bootstrap.css';
import Auth0ProviderWithHistory from './auth/Auth0Provider';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);