import React from 'react';
import './Styles/App.css';
import BugTracker from './BugTracker';
import LandingPage from './LandingPage';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";

import CallbackPage from './Callback'
import { createBrowserHistory } from "history";
import Auth from '../auth/Auth'

function App(props) {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Auth>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={LandingPage}/>
              <Route path="/dashboard" component={BugTracker}>
              </Route>
              <Route path="/callback" component={CallbackPage}/>
            </Switch>
          </Router>
      </Auth>
    </div>
  
  );
}

export default App;
