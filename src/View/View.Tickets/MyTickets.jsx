import '../Styles/App.css';

import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import TicketController from "../../Controller/Ticket.Controller";
import ProjectController from '../../Controller/Project.Controller';
import { useAuth0 } from "@auth0/auth0-react";

function ButtonNewTicket(props) {
  let { path } = useRouteMatch();
  return props.projectId === "" ? <> </> : (<Link to={`${path}/${props.projectId}/newTicket`} className="btn btn-primary py-2">Create new ticket</Link>);
}

function MyTickets() {
  const headTitle = ["Ticket Name", "Ticket Description", "Type", "Priority", "Developer", "Status"];
  const columns = ["ticketName", "ticketDescription", "type", "priority", "developerEmail", "status"];
  const ticketController = new TicketController();
  const projectController = new ProjectController();
  let [ projects, setProjects] = useState([]);
  let [ tickets, setTickets] = useState([]);
  let [ selectedProject, setSelectedProject] = useState("");
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getProjects = async () => {
     try {
        const token = await getAccessTokenSilently({
          permissions: "read:projects"
        });
        projectController.setAccessToken(token);
        projectController.getProjectsByProjectManager(user.email)
          .then(response => {
            setProjects(response.data)
          })
          .catch(e => {
            console.log(e);
          });
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getProjects();
  }, []);

  const deleteTicketById = (id) => {
    ticketController.deleteTicketById(id);
    updateTickets();
  }

  const updateSelectedProject = (e) => {
    if (e.target.value === "") {
      setTickets([]);
    } else {
      setSelectedProject(e.target.value);
      updateTickets();
    }
  }

  const updateTickets = () => {
    ticketController.getTicketsByProjectId(selectedProject)
       .then(response => {
         setTickets(response.data)
       })
       .catch(e => {
         console.log("Ticket error => " + e);
       });
   }

  return(
    <div className="content-container">
      <select className="browser-default custom-select" id="selectProjectInput" value={selectedProject} 
              onChange={updateSelectedProject}>
              <option value="">Select project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>{project.projectName}</option>
        ))}
      </select>
      <ButtonNewTicket projectId={selectedProject}/>
      <div className="content-title">
        <h1>Edit tickets</h1>
        <h2>You can see tickets details, edit or remove it!</h2>
      </div>
        <Table modalText={"Are you sure to delete this ticket?"} 
        delete={deleteTicketById} 
        data={tickets} columns={columns} head={headTitle}/>
    </div>
    );
}

export default MyTickets;