import '../Styles/App.css';

import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import ProjectController from "../../Controller/Project.Controller";
import TicketController from "../../Controller/Ticket.Controller";

function ButtonNewProject() {
  let { url } = useRouteMatch();
  return (<Link to={`${url}/newProject`} className="btn btn-primary py-2">Create new project</Link>);
}

export default class MyProjects extends React.Component {
  constructor(props) {
    super(props);
    this.headTitle = ["Project Name", "Project Description", "Project manager", "Actions"];
    this.columns = ["projectName", "projectDescription", "projectManager"];
    this.projectController = new ProjectController();
    this.ticketController = new TicketController();
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.projectController.getProjects()
      .then(response => {
        this.setState({
          projects: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteProjectById = (id) => {
    this.projectController.deleteProjectById(id);
    this.ticketController.deleteTicketsByProjectId(id);
  }

  render() {
    return(
      <div className="content-container">
        <ButtonNewProject/>
        <div className="content-title">
          <h1>Edit projects</h1>
          <h2>You can see projects details, edit or remove it!</h2>
        </div>
          <Table modalText={"Are you sure to delete this project? All tickets related to it will be removed as well"} 
          delete={this.deleteProjectById} data={this.state.projects} 
          columns={this.columns} head={this.headTitle}/>
      </div>
      );
  }
}