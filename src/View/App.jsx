import React from 'react';
import './Styles/App.css';
import BugTracker from './BugTracker';
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from './LandingPage';

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated ?  <div className="App"><BugTracker/></div> : <div className="App"><LandingPage/></div>
  );
}

export default App;
