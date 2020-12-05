import React from 'react';
import './Styles/App.css';
import Dashboard from './Dashboard';
import {
  Router,
  Switch,
  Route
} from "react-router-dom";
import CallbackPage from './Callback'
import history from './history'
import Auth from '../auth/Auth'
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      <Auth>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/callback" component={CallbackPage}/>
            </Switch>
          </Router>
      </Auth>
    </div>
  
  );
}

export default App;
