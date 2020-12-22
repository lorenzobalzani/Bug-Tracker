import {Bar, Radar} from 'react-chartjs-2'
import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ProjectController from '../../Controller/Project.Controller';
import TicketController from '../../Controller/Ticket.Controller';
import ConditionalRender from '../View.Utility/ConditionalRender';
import DashboardDeveloper from './Dashboard.Developer';
import DashboardProjectManager from './Dashboard.ProjectManager';
import jwt from 'jsonwebtoken';


function Dashboard() {
    let data = [15, 3, 30];
    let data2 = [4, 15, 20];
    let [ tickets, setTickets ] = useState([]);
    let [ permissions, setPermissions ] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();
    const projectController = new ProjectController();
    const ticketController = new TicketController();

    useEffect(() => {
        getAccessTokenSilently().then(token => {
                   setPermissions((jwt.decode(token)).permissions);
        })

        const getTickets = async () => {
         try {
            const token = await getAccessTokenSilently({
              permissions: "read:projects read:tickets"
            });
            projectController.setAccessToken(token);
            ticketController.setAccessToken(token);
            projectController.getProjectsByProjectManager(user.email)
              .then(response => {
                response.data.map(project => {
                    console.log(project)
                    ticketController.getTicketsByProjectId(project.id).
                    then(response => {
                        setTickets(response.data);
                    })
                })
              })
              .catch(e => {
                console.log(e);
              });
          } catch (e) {
            console.log(e.message);
          }
        };
        getTickets();
      }, []);

    if (ConditionalRender(permissions, "read:projects")) {
        return <div className="content-container">
        <div className="content-title">
          <h1>Dashboard</h1>
          <h2>Description</h2>
        </div>
        <div className="container-fluid">
        <div className="graphs row"><DashboardProjectManager/>
        </div>
        </div>
      </div>
    } else if (ConditionalRender(permissions, "read:tickets")){
        return <div className="content-container">
        <div className="content-title">
          <h1>Dashboard</h1>
          <h2>Description</h2>
        </div>
        <div className="container-fluid">
        <div className="graphs row"> <DashboardDeveloper/>
        </div>
        </div>
      </div>
    }
    return null;
}

export default Dashboard;