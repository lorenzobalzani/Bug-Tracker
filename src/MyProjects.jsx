import './styles/App.css';
import firebase from './Firebase';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('projects');
    this.unsubscribe = null;
    this.state = {
      projects: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const projects = [];
    querySnapshot.forEach((doc) => {
      const { projectName, projectDescription } = doc.data();
      projects.push({
        key: doc.id,
        doc, // DocumentSnapshot
        projectName,
        projectDescription
      });
    });
    this.setState({
      projects
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return(
      <div className="content-container">
        <Link to="/myProjects/newProject" className="btn btn-primary py-2">Create new project</Link>
        <div className="content-title">
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
          {this.state.projects.map(project =>
                  <tr>
                    <td className="align-middle"> {project.projectName}</td>
                    <td className="align-middle"> {project.projectDescription}</td>
                    <td className="align-middle"><Link to={"/"} className="btn btn-primary mr-2">Manage users</Link><button className="btn btn-primary">Details</button></td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>);
  }
}