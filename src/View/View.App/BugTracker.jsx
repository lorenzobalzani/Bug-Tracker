import '../Styles/App.css';
import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import MyProjects from '../View.Projects/MyProjects';
import NewProject from '../View.Projects/NewProject';
import NewTicket from '../View.Tickets/NewTicket';
import Users from '../View.Users/Users';
import ConditionalRender from '../View.Utility/ConditionalRender'
import Loading from '../View.Utility/Loading';
import { PeopleIcon, ListIcon, ProjectsIcon, LogOutIcon, HomeIcon, ProfileIcon } from '../Styles/Icons';
import ChangeUserDetails from '../View.Users/ChangeUserDetails'
import {withAuthenticationRequired, useAuth0} from '@auth0/auth0-react'
import jwt from 'jsonwebtoken';
import MyTickets from '../View.Tickets/MyTickets';
import Dashboard from '../View.Dashboard/Dashboard';
import axios from "axios";
import Error from '../View.Utility/Error';

axios.create({
  baseURL: "http://192.168.178.24:8080/api/",
});

function CreateList() {
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
  }, [getAccessTokenSilently]);

  return (<>
        <li><Link id="dashboard" to="/dashboard" className="nav-link buttonNav py-3 btn btn-block"><HomeIcon/>Dashboard</Link></li>
    
        {ConditionalRender(permissions, "read:users") && (
          <li><Link id="users" to={`${url}/users`} className="nav-link buttonNav py-3 btn btn-block"><PeopleIcon/>App's users</Link></li>
        )}

        {ConditionalRender(permissions, "read:tickets") && (
          <li><Link id="tickets" to={`${url}/myTickets`} className="nav-link buttonNav py-3 btn btn-block"><ListIcon/>My tickets</Link></li>
        )}

        {ConditionalRender(permissions, "read:projects") && (
         <li><Link id="projects" to={`${url}/myProjects`} className="nav-link buttonNav py-3 btn btn-block"><ProjectsIcon/>My projects</Link></li>
        )}

        <li> <Link id="profile" to={`${url}/myProfile`} className="nav-link buttonNav py-3 btn btn-block"><ProfileIcon/>My profile</Link></li>

        <li><a className="nav-link buttonNav py-3 btn btn-block" onClick={() => logout({ returnTo: window.location.origin })}> <LogOutIcon/>Logout</a></li>
        </>);
}

function LeftBar() {
  return (
    <div id="leftColumn" className="col-xs-12 col-sm-12 col-md-3 d-flex justify-content-center">
      <ul>
        <CreateList/>
      </ul>
    </div>
  );
}

function MobileNavBar() {
  return (<>
  <nav className="navbar bg-dark navbar-dark">
  <a className="navbar-brand" href="#">BugTracker</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <CreateList/>
    </ul>
  </div>
  </nav></>);
}

function NavBar (){
  let { path } = useRouteMatch();
  const { user } = useAuth0();
  return(
    <>
      <div id="nav" className="maxHeight row align-items-center">
        <h1>Logged in as {user.email}</h1>
      </div>  
      <div id="content" className="row">
        <Switch>
          <Route exact path={`${path}`} component={Dashboard}/>
          <Route exact path={`${path}/myProjects`} component={MyProjects}/>
          <Route path={`${path}/myProjects/newProject`} component={NewProject}/>
          <Route exact path={`${path}/myTickets`} component={MyTickets}/>
          <Route path={`${path}/myTickets/:projectId/newTicket`} component={NewTicket}/>
          <Route exact path={`${path}/users`} component={Users}/>
          <Route path={`${path}/users/:userId/edit`} component={ChangeUserDetails}/>
        </Switch>
      </div>
    </>
  )
}

function BugTrackerHome() {
  return(
  <>
  <div className="container-fluid">
    <div className="row">
      <LeftBar/>
      <div id="rightColumn" className="col-xs-12 col-sm-12 col-md-9 h-100">
        <MobileNavBar/>
        <NavBar/>
      </div>
    </div>
  </div></>
);
}

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <Loading/>,
    })}
    {...args}
  />
);

function BugTracker() {

  let [ status, setStatus ] = useState(true);

  useEffect(() => {
    fetch('http://192.168.178.24:8080/status')
    .then()
    .catch(response => {
      setStatus(false)
    })
  }, [])
  
  return status ? <ProtectedRoute path="/dashboard" component={BugTrackerHome}/> : <Error/>
}

export default BugTracker;