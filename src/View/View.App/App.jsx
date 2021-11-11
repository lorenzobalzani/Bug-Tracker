import React from 'react';
import '../Styles/App.css';
import BugTracker from './BugTracker';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import history from '../View.Utility/History'
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Loading from '../View.Utility/Loading';

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
          redirectUri="https://bug-tracker-balzani.herokuapp.com/dashboard"
          audience="https://bugtracker-api"
          onRedirectCallback={onRedirectCallback}
          /*These are all scopes that app could use in the future. After authentication user will have only own permissions, 
          not for sure all listed below*/
          scope={scopes}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/dashboard" component={BugTracker}/>
            </Switch>
          </Router>
      </Auth0Provider>
    </div>
  );
}

function HomePage() {
  const { loginWithRedirect } = useAuth0();
  loginWithRedirect();
  return (<Loading/>);
}

export default App;
