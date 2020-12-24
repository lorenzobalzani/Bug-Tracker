import '../Styles/App.css';

import React, { useState, useEffect } from "react";
import TicketController from "../../Controller/Ticket.Controller";
import { useAuth0 } from "@auth0/auth0-react";
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function Ticket(props) {
    return (<>
            <h2>{props.ticket.ticketName}</h2>
            <p>{props.ticket.priority}</p>
            <p>{props.ticket.type}</p></>);
}

function Column(props) {
  return (<> <h1>{props.colTitle}</h1>
    <Droppable droppableId={props.droppableId}>
      {(provided) => (
        <ul className={props.droppableId} {...provided.droppableProps} ref={provided.innerRef}>
          {props.tickets.map((ticket, index) => {
            return(
              <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                {(provided) => (
                  <>
                  <li className="listItem" 
                  ref={provided.innerRef} 
                  {...provided.draggableProps} 
                  {...provided.dragHandleProps}>
                    <Ticket ticket={ticket}/>
                  </li>
                  </>
                )}
              </Draggable>
            );
          })}
        {provided.placeholder}
        </ul>
      )}
    </Droppable></>);
}

function MyTicketsDeveloper() {
  let [ tickets, setTickets ] = useState({openTickets: [], inProgressTickets: [], closedTickets: []});
  const { user, getAccessTokenSilently } = useAuth0();
  const ticketController = new TicketController();
  
  useEffect(() => {
    const getTickets = async () => {
     try {
        const token = await getAccessTokenSilently({
          permissions: "read:tickets"
        });
        ticketController.setAccessToken(token);
        ticketController.getTicketsByDeveloperEmail(user.email)
          .then(response => {
            setTickets(prevState => ({...prevState, 
              openTickets: response.data.filter(ticket => ticket.status === "openTickets")}));
            setTickets(prevState => ({...prevState, 
              inProgressTickets: response.data.filter(ticket => ticket.status === "inProgressTickets")}));
            setTickets(prevState => ({...prevState, 
              closedTickets: response.data.filter(ticket => ticket.status === "closedTickets")}));
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

  const updateTicket = async (ticket) => {
    try {
      const token = await getAccessTokenSilently({
        permissions: "update:tickets"
      });
      ticketController.setAccessToken(token);
      ticketController.updateTicket(ticket)
        .then()
        .catch(e => {
          console.log("Ticket error => " + e);
        });
    } catch (e) {
      console.log(e.message);
    }
  };

  const moveTo = (result) => {
    if (!result.destination) return;
    const sourceItems = tickets[result.source.droppableId];
    const destinationItems = tickets[result.destination.droppableId];
    const [item] = sourceItems.splice(result.source.index, 1);
    destinationItems.splice(result.destination.index, 0, item);
    item.status = result.destination.droppableId;
    updateTicket(item);
    setTickets(prevState => ({...prevState, 
      [result.source.droppableId]: sourceItems, [result.destination.droppableId]: destinationItems}));
  }
  
  return (
    <div className="content-container">
      <div className="content-title">
        <h1>My Tickets</h1>
        <h2>Move the tickets through the columns to change their status!</h2>
      </div>
      <div id="boxes" className="row">
      <DragDropContext onDragEnd={moveTo}>
        <div className="col col-12 col-lg-4">
          <Column colTitle={"Open"} droppableId={"openTickets"} tickets={tickets.openTickets} />
          {tickets.openTickets.length < 1 && (
            <h3>There are no open tickets</h3>
          )}
        </div>
        <div className="col col-12 col-lg-4">
          <Column colTitle={"In progress"} droppableId={"inProgressTickets"} tickets={tickets.inProgressTickets} />
          {tickets.inProgressTickets.length < 1 && (
            <h3>There are no in progress tickets</h3>
          )}
        </div>
        <div className="col col-12 col-lg-4">
          <Column colTitle={"Closed"} droppableId={"closedTickets"} tickets={tickets.closedTickets} />
          {tickets.closedTickets.length < 1 && (
            <h3>There are no closed tickets</h3>
          )}
        </div>
        </DragDropContext>
      </div>
    </div>
    );
}

export default MyTicketsDeveloper;