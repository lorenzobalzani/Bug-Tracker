import './Styles/App.css';
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import MyProjects from './View.Projects/MyProjects';
import NewProject from './View.Projects/NewProject';
import NewTicket from './View.Tickets/NewTicket';
import Users from './View.Users/Users';
import ConditionalRender from './ConditionalRender'
import Loading from './Loading';
import { PeopleIcon, ListIcon, ProjectsIcon, LogOutIcon, HomeIcon, ProfileIcon } from './Styles/Icons';
import ChangeUserDetails from './View.Users/ChangeUserDetails'
import {withAuthenticationRequired, useAuth0} from '@auth0/auth0-react'
import jwt from 'jsonwebtoken';
import MyTickets from './View.Tickets/MyTickets';

function LeftBar() {
  let { url } = useRouteMatch();
  const { logout } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();
  let [ permissions, setPermissions ] = useState([]);
  
  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    getAccessTokenSilently().then((token) => {
      if (isMounted) setPermissions((jwt.decode(token)).permissions);
    });
    return () => { isMounted = false }; // use effect cleanup to set flag false, if unmounted
  }, []);

  return (
    <div id="leftColumn" className="col-xs-12 col-sm-12 col-md-3 d-flex justify-content-center">
      <ul>
        <li><Link to="/" className="buttonNav py-3 btn btn-block"><HomeIcon/>Dashboard</Link></li>
    
        {ConditionalRender(permissions, "read:users") && (
          <li><Link to={`${url}/users`} className="buttonNav py-3 btn btn-block"><PeopleIcon/>App's users</Link></li>
        )}

        {ConditionalRender(permissions, "read:tickets") && (
          <li><Link to={`${url}/myTickets`} className="buttonNav py-3 btn btn-block"><ListIcon/>My tickets</Link></li>
        )}

        {ConditionalRender(permissions, "read:projects") && (
         <li><Link to={`${url}/myProjects`} className="buttonNav py-3 btn btn-block"><ProjectsIcon/>My projects</Link></li>
        )}

        <li> <Link to={`${url}/myProfile`} className="buttonNav py-3 btn btn-block"><ProfileIcon/>My profile</Link></li>

        <li><a className="buttonNav py-3 btn btn-block" onClick={() => logout({ returnTo: window.location.origin })}> <LogOutIcon/>Logout</a></li>
      </ul>
    </div>
  );
}

function NavBar (){
  let { path } = useRouteMatch();
  const { user } = useAuth0();
  return(
    <div>
      <div id="nav" className="maxHeight row align-items-center">
        <h1>Logged in as {user.email}</h1>
      </div>  
      <div id="content" className="row">
        <Switch>
          <Route exact path={`${path}/myProjects`} component={MyProjects}/>
          <Route path={`${path}/myProjects/newProject`} component={NewProject}/>
          <Route exact path={`${path}/myTickets`} component={MyTickets}/>
          <Route path={`${path}/myTickets/:projectId/newTicket`} component={NewTicket}/>
          <Route exact path={`${path}/users`} component={Users}/>
          <Route path={`${path}/users/:userId/edit`} component={ChangeUserDetails}/>
        </Switch>
      </div>
    </div>
  )
}

function BugTracker() {
  return(
  <div className="container-fluid">
    <div className="row">
      <LeftBar/>
      <div id="rightColumn" className="col-xs-12 col-sm-12 col-md-9 h-100">
        <NavBar/>
      </div>
    </div>
  </div>);
}

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading/>,
    })}
    {...args}
  />
);

function Dashboard() {
  return (<ProtectedRoute path="/dashboard" component={BugTracker}/>);
}

export default Dashboard;