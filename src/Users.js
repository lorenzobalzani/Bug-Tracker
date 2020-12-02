import './styles/App.css';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button} from 'reactstrap';
import Table from './Table'

function EditUser () {
    let headTitle = ["Username", "Email", "Role", "Actions"];
    let columns = ["username", "email", "role"];
    let users = [{
      username: "balzanilo",
      email: "balzanilo@gmail.com",
      role: "Developer"
    }]

    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Edit users</h1>
        <h2>You can see user details, edit or remove it!</h2>
      </div>
      <Table data={users} columns={columns} head={headTitle}/>
    </div>);
}

export default EditUser;