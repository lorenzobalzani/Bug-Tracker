import '../Styles/App.css';

import React, { useState, useEffect } from "react";
import TicketController from "../../Controller/Ticket.Controller";
import { useAuth0 } from "@auth0/auth0-react";
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';

function Ticket(props) {
          return (<>
                  <h2>{props.ticket.ticketName}</h2>
                  <h2>Priority</h2>
                  <p>{props.ticket.priority}</p></>);
}

function MyTicketsDeveloper() {
  //const headTitle = ["Ticket Name", "Ticket Description", "Type", "Priority", "Developer", "Status"];
  //const columns = ["ticketName", "ticketDescription", "type", "priority", "developerEmail", "status"];
  let [ tickets, setTickets ] = useState({openTickets: [], inProgressTickets: [], closedTickets: []});
  const { user, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
   
    const ticketController = new TicketController();
    const getTickets = async () => {
     try {
        const token = await getAccessTokenSilently({
          permissions: "read:tickets"
        });
        ticketController.setAccessToken(token);
        ticketController.getTicketsByDeveloperEmail(user.email)
          .then(response => {
            setTickets(prevState => ({...prevState, 
              openTickets: response.data.filter(ticket => ticket.status === "Open")}));
            setTickets(prevState => ({...prevState, 
              inProgressTickets: response.data.filter(ticket => ticket.status === "In progress")}));
            setTickets(prevState => ({...prevState, 
              closedTickets: response.data.filter(ticket => ticket.status === "Closed")}));
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

  const drag = (result) => {
    if (!result.destination) return;
    const sourceItems = tickets[result.source.droppableId];
    const destinationItems = tickets[result.destination.droppableId];
    const [item] = sourceItems.splice(result.source.index, 1);
    destinationItems.splice(result.destination.index, 0, item);
    setTickets(prevState => ({...prevState, 
      [result.source.droppableId]: sourceItems}));
    setTickets(prevState => ({...prevState, 
        [result.destination.droppableId]: destinationItems}));
  }
  
  return (
    <div className="content-container">
      <div className="content-title">
        <h1>My Tickets</h1>
        <h2>Move your tickets to change their status!</h2>
      </div>
      <div id="boxes" className="row">
      <DragDropContext onDragEnd={drag}>
        <div className="col col-12 col-lg-4">
        <h1>Open</h1>
          <Droppable droppableId="openTickets">
            {(provided) => (
              <ul className="openTickets" {...provided.droppableProps} ref={provided.innerRef}>
                {tickets.openTickets.map((ticket, index) => {
                  return(
                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                      {(provided) => (
                        <li className="listItem" 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                          <Ticket ticket={ticket}/>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        <div className="col col-12 col-lg-4">
        <h1>In progress</h1>
          <Droppable droppableId="inProgressTickets">
            {(provided) => (
              <ul className="inProgressTickets" {...provided.droppableProps} ref={provided.innerRef}>
                {tickets.inProgressTickets.map((ticket, index) => {
                  return(
                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                      {(provided) => (
                        <li className="listItem" 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                          <Ticket ticket={ticket}/>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        <div className="col col-12 col-lg-4">
        <h1>Closed</h1>
          <Droppable droppableId="closedTickets">
            {(provided) => (
              <ul className="closedTickets" {...provided.droppableProps} ref={provided.innerRef}>
                {tickets.closedTickets.map((ticket, index) => {
                  return(
                    <Draggable key={ticket.id} draggableId={ticket.id} index={index}>
                      {(provided) => (
                        <li className="listItem" 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}>
                          <Ticket ticket={ticket}/>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </div>

        </DragDropContext>
      </div>
        {/*<Table modalText={"Are you sure to delete this ticket?"} 
        delete={deleteTicketById} 
              data={tickets} columns={columns} head={headTitle}/>*/}
    </div>
    );
}

export default MyTicketsDeveloper;