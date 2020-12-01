import './styles/App.css';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from './Firebase';

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('projects');
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
                    
                    <td className="align-middle">
                    <Link to={"/"} className="btn btn-primary mr-2">Manage users</Link>
                    <button className="btn btn-primary mr-2"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                      <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </button>
                    <button className="btn btn-primary">
                      <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>);
  }
}