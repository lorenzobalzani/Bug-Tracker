import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ConditionalRender from '../View.Utility/ConditionalRender';
import DashboardDeveloper from './Dashboard.Developer';
import DashboardProjectManager from './Dashboard.ProjectManager';
import jwt from 'jsonwebtoken';


function Dashboard() {
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
            <h1>Welcome to BugTracker</h1>
        </div>
        <div className="container-fluid">
        <div className="graphs row"><DashboardProjectManager/>
        </div>
        </div>
      </div>
    } else if (ConditionalRender(permissions, "read:tickets")){
        return <div className="content-container">
        <div className="content-title">
          <h1>Welcome to BugTracker</h1>
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