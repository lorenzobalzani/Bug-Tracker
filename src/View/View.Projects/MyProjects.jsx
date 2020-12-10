import '../Styles/App.css';

import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import ProjectController from "../../Controller/Project.Controller";
import TicketController from "../../Controller/Ticket.Controller";

function ButtonNewProject() {
  let { url } = useRouteMatch();
  return (<Link to={`${url}/newProject`} className="btn btn-primary py-2">Create new project</Link>);
}

function MyProjects () {
  
  const headTitle = ["Project Name", "Project Description", "Project manager", "Actions"];
  const columns = ["projectName", "projectDescription", "projectManager"];
  const projectController = new ProjectController();
  const ticketController = new TicketController();
  let [projects, setProjects] = useState([]);
  

  useEffect(() => {
    projectController.getProjects()
    .then(response => {
      setProjects(response.data)
    })
    .catch(e => {
      console.log(e);
    });
  });

  const deleteProjectById = (id) => {
    projectController.deleteProjectById(id);
    ticketController.deleteTicketsByProjectId(id);
  }

  return(
    <div className="content-container">
      <ButtonNewProject/>
      <div className="content-title">
        <h1>Edit projects</h1>
        <h2>You can see projects details, edit or remove it!</h2>
      </div>
        <Table modalText={"Are you sure to delete this project? All tickets related to it will be removed as well"} 
        delete={deleteProjectById} data={projects} 
        columns={columns} head={headTitle}/>
    </div>
    );
}

export default MyProjects;