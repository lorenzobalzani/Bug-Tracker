import './Styles/App.css';

import React from "react";
import { Link } from "react-router-dom";
import Table from './Table'
import axios from 'axios';

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.headTitle = ["Project Name", "Project Description", "Project manager"];
    this.columns = ["projectName", "projectDescription"];
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    fetch('https://bug-tracker-server-balzani.herokuapp.com/getProjects')
      .then((response) => response.json())
      .then((data) => this.setState({projects: data}));
  }

  render() {
    return(
      <div className="content-container">
        <Link to="/myProjects/newProject" className="btn btn-primary py-2">Create new project</Link>
        <div className="content-title">
          <h1>Edit projects</h1>
          <h2>You can see projects details, edit or remove it!</h2>
        </div>
          <Table data={this.state.projects} columns={this.columns} head={this.headTitle}/>
      </div>);
  }
}