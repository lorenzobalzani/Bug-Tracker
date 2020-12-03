import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './View/LandingPage';
import 'bootstrap/dist/css/bootstrap.css';
import Auth0ProviderWithHistory from './auth/Auth0Provider';

ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <LandingPage/>
    </Auth0ProviderWithHistory>
  </BrowserRouter>,
  document.getElementById('root')
);