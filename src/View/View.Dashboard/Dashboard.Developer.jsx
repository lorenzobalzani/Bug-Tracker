import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2'
import { useAuth0 } from "@auth0/auth0-react";
import TicketController from '../../Controller/Ticket.Controller';

function BarGraph(props) {
    return(
        <Bar
            data={{
                labels: props.labelsX,
                datasets: [
                    {
                        data: props.data,
                        backgroundColor: props.colors,
                        borderColor: props.colors,
                        borderWidth: 1
                    }]
            }}
            options={{
                maintainAspectRatio: false,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: props.title
                    },
                    layout: {
                       
                    },
                    scales: {
                        yAxes : [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
            }}/>
    );
}

function DashboardDeveloper() {
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
                <BarGraph title={"Ticket by status"} data={statusGraph} labelsX={['Open', 'In progress', 'Closed']} 
                colors={['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)']}/>
           </div>
           <div className="col col-12 col-xl-6">
                <BarGraph title={"Ticket by type"} data={typeGraph} labelsX={['Bug', 'Feature']} 
                        colors={['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)']}/>
           </div>
           <div className="col col-12">
                <BarGraph title={"Ticket by priority"} data={priorityGraph} labelsX={['Low', 'Normal', 'High']} 
                        colors={['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)']}/>
           </div>
    </>);
}

export default DashboardDeveloper;