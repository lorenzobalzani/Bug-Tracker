import '../Styles/App.css';
import '../Styles/Form.css';

import React from "react";
import TicketController from '../../Controller/Ticket.Controller';
import {
    useParams
  } from "react-router-dom";
  import history from '../history'


class Input extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {ticketName: "", ticketDescription: "", projectName: this.props.projectName, 
        developerEmail: "", type: "", priority: "", status: ""};
        this.ticketController = new TicketController();
    }

    createTicket = (e) => {
        e.preventDefault();
        this.ticketController.createTicket(this.state);
        history.push("/dashboard/myTickets")
    }

    updateField = (e) => {
        const state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    render() {
        return (<>
            <form>
                <div className="form-group row">
                    <label htmlFor="ticketName" className="col-sm-2 col-form-label">Ticket name</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.ticketName} 
                            onChange={this.updateField} className="form-control" id="ticketName" placeholder="Ticket name"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="ticketDescription" className="col-sm-2 col-form-label">Ticket description</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.ticketDescription} 
                            onChange={this.updateField} className="form-control" id="ticketDescription" placeholder="Ticket description"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="developerEmail" className="col-sm-2 col-form-label">Developer</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.developerEmail} 
                            onChange={this.updateField} className="form-control" id="developerEmail" placeholder="Developer email"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.type} 
                            onChange={this.updateField} className="form-control" id="type" placeholder="Type"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.priority} 
                            onChange={this.updateField} className="form-control" id="priority" placeholder="Priority"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.status} 
                            onChange={this.updateField} className="form-control" id="status" placeholder="Status"/>
                        </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" onClick={this.createTicket} className="btn btn-primary">Create ticket</button>
                    </div>
                </div>
            </form>
        </>);
    }
}

function NewTicket () {
    let { projectName } = useParams();
    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Add new ticket</h1>
      </div>
      <Input projectName = {projectName}/>
    </div>);
}

export default NewTicket;