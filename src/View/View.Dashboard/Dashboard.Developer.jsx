import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import TicketController from '../../Controller/Ticket.Controller';
import BarGraph from '../View.Utility/BarGraph'
import Doughnut from '../View.Utility/Doughnut';

function DashboardDeveloper(props) {
    const { user, getAccessTokenSilently } = useAuth0();
    let [ statusGraph, setStatusGraph] = useState();
    let [ typeGraph, setTypeGraph] = useState();
    let [ priorityGraph, setPriorityGraph] = useState();

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
                    setStatusGraph([]);
                    setTypeGraph([]);
                    setPriorityGraph([]);
                    setStatusGraph(statusGraph => [...statusGraph, response.data.filter(ticket => ticket.status === "Open").length, 
                    response.data.filter(ticket => ticket.status === "In progress").length, response.data.filter(ticket => ticket.status === "Closed").length]);
                    setTypeGraph(typeGraph => [...typeGraph, response.data.filter(ticket => ticket.type === "Bug").length, 
                    response.data.filter(ticket => ticket.type === "Feature").length]);
                    setPriorityGraph(priorityGraph => [...priorityGraph, response.data.filter(ticket => ticket.priority === "Low").length, 
                    response.data.filter(ticket => ticket.priority === "Normal").length, response.data.filter(ticket => ticket.priority === "High").length]);
                })
                 .catch(e => {
                   console.log(e);
                 });
             } catch (e) {
               console.log(e.message);
             }
           };
           getTickets();
    }, [getAccessTokenSilently, user])

    return (<>
            <div className="col col-12 col-xl-6">
              {props.pieGraphs ?  <Doughnut title={"Tickets by status"} data={statusGraph} labelsX={['Open', 'In progress', 'Closed']} 
                colors={['rgba(204, 51, 0, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(51, 153, 0, 0.8)']}/> :
                <BarGraph title={"Tickets by status"} data={statusGraph} labelsX={['Open', 'In progress', 'Closed']} 
                colors={['rgba(204, 51, 0, 0.8)', 'rgba(54, 162, 235, 0.8)', 'rgba(51, 153, 0, 0.8)']}/>}
           </div>
           <div className="col col-12 col-xl-6">
             {props.pieGraphs ?  <Doughnut title={"Tickets by type"} data={typeGraph} labelsX={['Bug', 'Feature']} 
                        colors={['rgba(204, 51, 0, 0.8)', 'rgba(54, 162, 235, 0.8)']}/> : 
                <BarGraph title={"Tickets by type"} data={typeGraph} labelsX={['Bug', 'Feature']} 
                        colors={['rgba(204, 51, 0, 0.8)', 'rgba(54, 162, 235, 0.8)']}/>}
           </div>
           <div className="col col-12">
             {props.pieGraphs ?  <Doughnut title={"Tickets by priority"} data={priorityGraph} labelsX={['Low', 'Normal', 'High']} 
                        colors={['rgba(51, 153, 0, 0.8)', 'rgba(255, 153, 80, 0.8)', 'rgba(204, 51, 0, 0.8)']}/>: 
                <BarGraph title={"Tickets by priority"} data={priorityGraph} labelsX={['Low', 'Normal', 'High']} 
                        colors={['rgba(51, 153, 0, 0.8)', 'rgba(255, 153, 80, 0.8)', 'rgba(204, 51, 0, 0.8)']}/>}
           </div>
    </>);
}

export default DashboardDeveloper;