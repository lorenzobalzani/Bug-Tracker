import { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import ConditionalRender from '../View.Utility/ConditionalRender';
import DashboardDeveloper from './Dashboard.Developer';
import DashboardProjectManager from './Dashboard.ProjectManager';
import jwt from 'jsonwebtoken';


function Dashboard() {
    let [ permissions, setPermissions ] = useState([]);
    let [ isChecked, setIsChecked ] = useState(false);;
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        getAccessTokenSilently().then(token => {
                   setPermissions((jwt.decode(token)).permissions);
        })
      }, [getAccessTokenSilently]);


    const pieGraphSwitch = 
    <div className="custom-switch">
      <input type="checkbox" checked={isChecked} onChange={ e => setIsChecked(e.currentTarget.checked)} className="custom-control-input" id="customSwitch1"/>
      <label className="custom-control-label" htmlFor="customSwitch1">Doughnut charts</label>
    </div>

    if (ConditionalRender(permissions, "read:projects")) {
        return <div className="content-container">
        <div className="content-title">
            <h1>Welcome to BugTracker</h1>
        </div>
        <div className="container-fluid">
        {pieGraphSwitch}
        <div id="graphs" className="row">
          <DashboardProjectManager pieGraphs={isChecked}/>
        </div>
        </div>
      </div>
    } else if (ConditionalRender(permissions, "read:tickets")){
        return <div className="content-container">
        <div className="content-title">
          <h1>Welcome to BugTracker</h1>
        </div>
        <div className="container-fluid">
        {pieGraphSwitch}
        <div id ="graphs" className="row">
          <DashboardDeveloper pieGraphs={isChecked}/>
        </div>
        </div>
      </div>
    }
    return null;
}

export default Dashboard;