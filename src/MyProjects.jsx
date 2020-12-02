import './styles/App.css';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import firebase from './Firebase';
import Table from './Table'

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.ref = firebase.firestore().collection('projects');
    this.headTitle = ["Project Name", "Project Description", "Project manager"];
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
        projectName: projectName,
        projectDescription: projectDescription
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
          <Table data={this.state.projects} head={this.headTitle}/>
      </div>);
  }
}