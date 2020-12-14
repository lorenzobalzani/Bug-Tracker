import '../Styles/App.css';
import '../Styles/Form.css';

import React, { useState } from "react";
import TicketController from '../../Controller/Ticket.Controller';
import {useParams} from "react-router-dom";
import history from '../history'
import { useAuth0 } from "@auth0/auth0-react";

function Input(props) {
    let [ ticket, setTicket ] = useState({ticketName: "", ticketDescription: "", projectId: props.projectId, 
    developerEmail: "", type: "", priority: "", status: ""});
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const ticketController = new TicketController();

    const createTicket = async (e) => {
        e.preventDefault();
        const token = await getAccessTokenSilently({
          permissions: "create:tickets update:tickets"
        });
        ticketController.setAccessToken(token);
        ticketController.createTicket(ticket);
        history.push("/dashboard/myTickets")
    }

    const updateField = (e) => {
        setTicket({...ticket, [`${e.target.id}`]: e.target.value});
    }

    return (<>
            <form>
                <div className="form-group row">
                    <label htmlFor="ticketName" className="col-sm-2 col-form-label">Ticket name</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.ticketName} 
                            onChange={updateField} className="form-control" id="ticketName" placeholder="Ticket name"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="ticketDescription" className="col-sm-2 col-form-label">Ticket description</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.ticketDescription} 
                            onChange={updateField} className="form-control" id="ticketDescription" placeholder="Ticket description"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="developerEmail" className="col-sm-2 col-form-label">Developer</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.developerEmail} 
                            onChange={updateField} className="form-control" id="developerEmail" placeholder="Developer email"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="type" className="col-sm-2 col-form-label">Type</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.type} 
                            onChange={updateField} className="form-control" id="type" placeholder="Type"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="priority" className="col-sm-2 col-form-label">Priority</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.priority} 
                            onChange={updateField} className="form-control" id="priority" placeholder="Priority"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="status" className="col-sm-2 col-form-label">Status</label>
                        <div className="col-sm-10">
                            <input type="text" value={ticket.status} 
                            onChange={updateField} className="form-control" id="status" placeholder="Status"/>
                        </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" onClick={createTicket} className="btn btn-primary">Create ticket</button>
                    </div>
                </div>
            </form>
    </>);
}

function NewTicket () {
    let { projectId } = useParams();
    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Add new ticket</h1>
      </div>
      <Input projectId = {projectId}/>
    </div>);
}

export default NewTicket;