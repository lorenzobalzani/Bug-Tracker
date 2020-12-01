import './App.css';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function MyProjects () {
    return(
    <div className="table-container">
      <button className="btn btn-primary py-2">Create new project</button>
      <div className="tableTitle">
        <h1>Edit projects</h1>
        <h2>You can see projects details, edit or remove it!</h2>
      </div>
      <table className="table table-striped table-hover table-sm table-bordered table-light">
        <thead>
          <th className="align-middle">Project name</th>
          <th className="align-middle">Description</th>
          <th className="align-middle">Actions</th>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle"> Bug Tracker</td>
            <td className="align-middle">Bug Tracker app written in React.js</td>
            <td className="align-middle"><button className="btn btn-primary mr-2">Manage users</button><button className="btn btn-primary">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>);
}

export default MyProjects;