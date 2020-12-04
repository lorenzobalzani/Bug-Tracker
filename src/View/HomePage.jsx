import React from 'react';
import './Styles/LandingPage.css';
import { AuthConsumer } from "../auth/AuthContext";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";

function LandingPage() {
  return (
  <div id="landingPage" class="text-center cover-container d-flex h-100 p-3 mx-auto flex-column">
      <header class="masthead mb-auto">
        <div class="inner">
          <h3 class="masthead-brand">Bug Tracker</h3>
          <nav class="nav nav-masthead justify-content-center">
            <a class="nav-link active" href="#">Home</a>
            <a class="nav-link" href="#">Features</a>
            <a class="nav-link" href="#">Contact</a>
          </nav>
        </div>
      </header>

      <main role="main" class="inner cover">
        <h1 class="cover-heading">Bug Tracker</h1>
        <h2 class="cover-heading">Make software development easy</h2>
        <p class="lead">
        <AuthConsumer>
          {({ initiateLogin }) => (
            <button className="btn btn-lg btn-secondary" onClick={initiateLogin}>
              Start now!
            </button>
        )}
        </AuthConsumer>
        </p>
      </main>
      <footer class="mastfoot mt-auto">
        <div class="inner">
          <p>By <a href="https://github.com/lorenzobalzani">Lorenzo Balzani</a></p>
        </div>
      </footer>
      </div>);
}

function HomePage() {
  return (
    <AuthConsumer>
    {({ authenticated }) =>
      authenticated ? (
        <Redirect to="/dashboard"/>
      ) : (
        <LandingPage/>
      )
    }
  </AuthConsumer>
  );
}

export default HomePage;
