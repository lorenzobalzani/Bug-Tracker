import React from 'react';
import './Styles/App.css';
import Dashboard from './Dashboard';
import {
  Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import history from './history'
import { Auth0Provider } from "@auth0/auth0-react";
import HomePage from './HomePage';

const scopes = "create:projects read:projects update:projects delete:projects" +
                " create:tickets read:tickets update:tickets delete:tickets";

function App() {
  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname)
  }
  return (
    <div className="App">
      <Auth0Provider
          domain="balzanilo.eu.auth0.com"
          clientId="tyffmLPmLw90LohrxChAf7no9dfJyNUz"
          redirectUri="http://192.168.178.24:3000/dashboard"
          audience="https://bugtracker-api"
          onRedirectCallback={onRedirectCallback}
          /*These are all scopes that app could use in the future. After authentication user will have only own permissions, 
          not for sure all listed below*/
          scope={scopes}>
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
