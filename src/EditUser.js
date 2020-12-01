import './styles/App.css';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'reactstrap';

function EditUser () {
    return(
    <div className="table-container">
      <div className="tableTitle">
        <h1>Edit users</h1>
        <h2>You can see user details, edit or remove it!</h2>
      </div>
      <table className="table table-striped table-hover table-sm table-bordered table-light">
        <thead>
          <th className="align-middle">Username</th>
          <th className="align-middle">Email</th>
          <th className="align-middle">Role</th>
          <th className="align-middle">Actions</th>
        </thead>
        <tbody>
          <tr>
            <td className="align-middle">lorenzo.balzani</td>
            <td className="align-middle">balzanilo@gmail.com</td>
            <td className="align-middle">Developer</td>
            <td className="align-middle"><button className="btn btn-primary mr-2">Edit</button><button className="btn btn-primary">Details</button></td>
          </tr>
          <tr>
            <td className="align-middle">lorenzo.balzani</td>
            <td className="align-middle">balzanilo@gmail.com</td>
            <td className="align-middle">Developer</td>
            <td className="align-middle"><button className="btn btn-primary mr-2">Edit</button><button className="btn btn-primary">Details</button></td>
          </tr>
        </tbody>
      </table>
    </div>);
}

export default EditUser;