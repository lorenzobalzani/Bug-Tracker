import '../Styles/App.css';

import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import TicketController from "../../Controller/Ticket.Controller";
import ProjectController from '../../Controller/Project.Controller';

function ButtonNewTicket(props) {
  let { url } = useRouteMatch();
  return (<Link Link to={`${url}/${props.projectName}/newTicket`} className="btn btn-primary py-2">Create new ticket</Link>);
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

  updateTickets(e) {
    this.setState({selectedProject: e.target.value})
    this.ticketController.getTicketsByProjectName(e.target.value)
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
                onChange={(e) => this.updateTickets(e)}>
                <option value="none">Select project</option>
          {this.state.projects.map((project) => (
            <option value={project.projectName}>{project.projectName}</option>
          ))}
        </select>
        <ButtonNewTicket projectName={this.state.selectedProject}/>
        <div className="content-title">
          <h1>Edit tickets</h1>
          <h2>You can see tickets details, edit or remove it!</h2>
        </div>
          <Table data={this.state.tickets} columns={this.columns} head={this.headTitle}/>
      </div>
      );
  }
}