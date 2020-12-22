import '../Styles/App.css';

import React, { useState, useEffect } from "react";
import Table from '../View.Utility/Table'
import TicketController from "../../Controller/Ticket.Controller";
import { useAuth0 } from "@auth0/auth0-react";

function MyTicketsDeveloper() {
  const headTitle = ["Ticket Name", "Ticket Description", "Type", "Priority", "Developer", "Status"];
  const columns = ["ticketName", "ticketDescription", "type", "priority", "developerEmail", "status"];
  const ticketController = new TicketController();
  let [ tickets, setTickets] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getTickets = async () => {
     try {
        const token = await getAccessTokenSilently({
          permissions: "read:tickets"
        });
        ticketController.setAccessToken(token);
        ticketController.getTicketsByDeveloperEmail(user.email)
          .then(response => {
            setTickets(response.data)
          })
          .catch(e => {
            console.log("Ticket error => " + e);
          });
      } catch (e) {
        console.log(e.message);
      }
    };
    getTickets();
  }, []);

  //TODO delete delete icon from table
  const deleteTicketById = () => {
      console.log("NOTHING");
  }

  return (
    <div className="content-container">
      <div className="content-title">
        <h1>My Tickets</h1>
        <h2>You can see tickets details and update them!</h2>
      </div>
        <Table modalText={"Are you sure to delete this ticket?"} 
        delete={deleteTicketById} 
        data={tickets} columns={columns} head={headTitle}/>
    </div>
    );
}

export default MyTicketsDeveloper;