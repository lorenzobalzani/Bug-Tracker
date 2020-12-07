import '../Styles/App.css';

import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import TicketController from "../../Controller/Ticket.Controller";
import ProjectController from '../../Controller/Project.Controller';

function ButtonNewTicket(props) {
  let { path } = useRouteMatch();
  return props.projectId === "" ? <> </> : (<Link Link to={`${path}/${props.projectId}/newTicket`} className="btn btn-primary py-2">Create new ticket</Link>);
}

export default class MyTickets extends React.Component {
  constructor(props) {
    super(props);
    this.headTitle = ["Ticket Name", "Ticket Description", "Type", "Priority", "Developer", "Status"];
    this.columns = ["ticketName", "ticketDescription", "type", "priority", "developerEmail", "status"];
    this.ticketController = new TicketController();
    this.state = {
      projects: [],
      selectedProject: "",
      tickets: []
    };
  }

  componentDidMount() {
    const projectController = new ProjectController()
    projectController.getProjectsByProjectManager("balzanilo@gmail.com")
    .then(response => {
      this.setState({
        projects: response.data
      });
    })
    .catch(e => {
      console.log(e);
    });
  }

  deleteTicketById = (id) => {
    this.ticketController.deleteTicketById(id);
    this.updateTickets();
  }

  updateSelectedProject = (e) => {
    if (e.target.value === "") {
      this.setState({tickets: []})
    } else {
      this.setState({selectedProject: e.target.value}, () => this.updateTickets());
    }
  }

  updateTickets() {
   this.ticketController.getTicketsByProjectId(this.state.selectedProject)
      .then(response => {
        this.setState({
          tickets: response.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return(
      <div className="content-container">
        <select class="browser-default custom-select" id="selectProjectInput" value={this.state.selectedProject} 
                onChange={this.updateSelectedProject}>
                <option value="">Select project</option>
          {this.state.projects.map((project) => (
            <option value={project.id}>{project.projectName}</option>
          ))}
        </select>
        <ButtonNewTicket projectId={this.state.selectedProject}/>
        <div className="content-title">
          <h1>Edit tickets</h1>
          <h2>You can see tickets details, edit or remove it!</h2>
        </div>
          <Table delete={this.deleteTicketById} 
          data={this.state.tickets} columns={this.columns} head={this.headTitle}/>
      </div>
      );
  }
}