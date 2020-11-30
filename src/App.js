import React from 'react';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import './App.css';
import BugTracker from './bugtracker';

function App() {
  return (
    <div className="App">
      <BugTracker/>
    </div>
  );
}

export default withRouter(App);
