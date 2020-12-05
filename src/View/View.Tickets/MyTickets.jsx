import '../Styles/App.css';

import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Table from '../Table'
import TicketController from "../../Controller/Ticket.Controller";

function ButtonNewTicket() {
  let { url } = useRouteMatch();
  return (<Link Link to={`${url}/newTicket`} className="btn btn-primary py-2">Create new ticket</Link>);
}

export default class MyTickets extends React.Component {
  constructor(props) {
    super(props);
    this.headTitle = ["Ticket Name", "Ticket Description", "Type", "Priority", "Developer", "Status"];
    this.columns = ["ticketName", "ticketDescription", "type", "priority", "developerEmail", "status"];
    this.ticketController = new TicketController();
    this.state = {
      selectedProject: "",
      tickets: []
    };
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
          <option value="Bug Tracker">Bug Tracker</option>
        </select>
        <ButtonNewTicket/>
        <div className="content-title">
          <h1>Edit tickets</h1>
          <h2>You can see tickets details, edit or remove it!</h2>
        </div>
          <Table data={this.state.tickets} columns={this.columns} head={this.headTitle}/>
      </div>
      );
  }
}