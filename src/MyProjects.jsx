import './styles/App.css';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function MyProjects () {
  let projectName = "Bug Tracker";
  let details = "/myProjects/" + 1;
    return(
    <div className="table-container">
      <Link to="/myProjects/newProject" className="btn btn-primary py-2">Create new project</Link>
      <div className="tableTitle">
        <h1>Edit projects</h1>
        <h2>You can see projects details, edit or remove it!</h2>
      </div>
      <table className="table table-striped table-hover table-sm table-bordered table-light">
        <thead>
          <th scope="col" >#</th>
          <th className="align-middle">Project name</th>
          <th className="align-middle">Description</th>
          <th className="align-middle">Actions</th>
        </thead>
        <tbody>
          <tr>
            <th scope="col" className="align-middle">1</th>
            <td className="align-middle"> {projectName}</td>
            <td className="align-middle">Bug Tracker app written in React.js</td>
            <td className="align-middle"><Link to={details} className="btn btn-primary mr-2">Manage users</Link><button className="btn btn-primary">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>);
}

export default MyProjects;