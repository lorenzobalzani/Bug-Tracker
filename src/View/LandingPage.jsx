import React from 'react';
import './Styles/LandingPage.css';

function LandingPage() {
  return (<div id="landingPage" class="text-center cover-container d-flex h-100 p-3 mx-auto flex-column">
  <header class="masthead mb-auto">
    <div class="inner">
      <h3 class="masthead-brand">Cover</h3>
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
      <a href="#" class="btn btn-lg btn-secondary">Start now!</a>
    </p>
  </main>

  <footer class="mastfoot mt-auto">
    <div class="inner">
      <p>By <a href="https://github.com/lorenzobalzani">Lorenzo Balzani</a>.</p>
    </div>
  </footer>
  </div>
  );
}

export default LandingPage;
