import React from 'react';
import './Styles/App.css';
import Dashboard from './Dashboard';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import history from './history'
import { Auth0Provider } from "@auth0/auth0-react";
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <Auth0Provider
          domain="balzanilo.eu.auth0.com"
          clientId="tyffmLPmLw90LohrxChAf7no9dfJyNUz"
          redirectUri="http://localhost:3000/dashboard"
          audience="https://bugtracker-api"
          scope="read:allProjects read:messages">
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/dashboard" component={Dashboard}/>
            </Switch>
          </Router>
      </Auth0Provider>
    </div>
  );
}

export default App;
