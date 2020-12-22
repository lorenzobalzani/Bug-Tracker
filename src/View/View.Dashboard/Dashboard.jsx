import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ConditionalRender from '../View.Utility/ConditionalRender';
import DashboardDeveloper from './Dashboard.Developer';
import DashboardProjectManager from './Dashboard.ProjectManager';
import jwt from 'jsonwebtoken';


function Dashboard() {
    let data = [15, 3, 30];
    let data2 = [4, 15, 20];
   
    let [ permissions, setPermissions ] = useState([]);
    const { user, getAccessTokenSilently } = useAuth0();
    

    useEffect(() => {
        getAccessTokenSilently().then(token => {
                   setPermissions((jwt.decode(token)).permissions);
        })
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