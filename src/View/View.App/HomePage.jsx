import React from 'react';
import '../Styles/LandingPage.css';
import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const { loginWithRedirect } = useAuth0();
  return (
  <div id="landingPage" className="text-center cover-container d-flex h-100 p-3 mx-auto flex-column">
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand">Bug Tracker</h3>
          <nav className="nav nav-masthead justify-content-center">
            <a className="nav-link active" href="#">Home</a>
            <a className="nav-link" href="#">Features</a>
            <a className="nav-link" href="#">Contact</a>
          </nav>
        </div>
      </header>

      <main role="main" className="inner cover">
        <h1 className="cover-heading">Bug Tracker</h1>
        <h2 className="cover-heading">Make software development easy</h2>
        <p className="lead">
            <button className="btn btn-lg btn-secondary" onClick={() => loginWithRedirect()}>
              Start now!
            </button>
        </p>
      </main>
      <footer className="mastfoot mt-auto">
        <div className="inner">
          <p>By <a href="https://github.com/lorenzobalzani">Lorenzo Balzani</a></p>
        </div>
      </footer>
      </div>);
}

function HomePage() {
  return (<LandingPage/>);
}

export default HomePage;
