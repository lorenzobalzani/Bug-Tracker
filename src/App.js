import React from 'react';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import './styles/App.css';
import BugTracker from './BugTracker';

function App() {
  return (
    <div className="App">
      <BugTracker/>
    </div>
  );
}

export default withRouter(App);
