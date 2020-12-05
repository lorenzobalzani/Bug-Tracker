import './Styles/App.css';
import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import MyProjects from './View.Projects/MyProjects';
import NewProject from './View.Projects/NewProject';
import MyTickets from './View.Tickets/MyTickets';
import NewTicket from './View.Tickets/NewTicket';
import {AuthConsumer} from "../auth/AuthContext";
import { PeopleIcon, ListIcon, ProjectsIcon, LogOutIcon, HomeIcon } from './Styles/Icons';

function LeftBar() {
  let { url } = useRouteMatch();
  return (
    <div id="leftColumn" className="col-xs-12 col-sm-12 col-md-3 d-flex justify-content-center">
      <ul>
      <li>
        <Link to="/" className="buttonNav py-3 btn btn-block"><HomeIcon/>Home</Link></li>
      <li>
        <Link to="/editUser" className="buttonNav py-3 btn btn-block"><PeopleIcon/>Edit users</Link></li>
      <li>
        <Link to={`${url}/myProjects`} className="buttonNav py-3 btn btn-block"><ProjectsIcon/>My projects</Link>
      </li>
      <li>
        <Link to={`${url}/myTickets`} className="buttonNav py-3 btn btn-block"><ListIcon/>My tickets</Link>
      </li>
        <AuthConsumer>
          {({ logout }) => (
          <li>
            <a className="buttonNav py-3 btn btn-block" onClick={logout}> <LogOutIcon/>Logout</a>
          </li>
          )}
        </AuthConsumer>
      </ul>
    </div>
  );
}

function NavBar(){
  let { path } = useRouteMatch();
  return(
    <div>
      <AuthConsumer>
        {({ user }) => (
          <div id="nav" className="maxHeight row align-items-center">
            <h1>Logged in as {user.email} - {user.role}</h1>
          </div>
        )}
      </AuthConsumer>
      <div id="content" className="row">
        <Switch>
          <Route exact path={`${path}/myProjects`} component={MyProjects}/>
          <Route path={`${path}/myProjects/newProject`} component={NewProject}/>
          <Route exact path={`${path}/myTickets`} component={MyTickets}/>
          <Route path={`${path}/myTickets/:projectId/newTicket`} component={NewTicket}/>
        </Switch>
      </div>
    </div>
  )
}

function Dashboard() {

  return (
    <AuthConsumer>
      {({ authenticated}) =>
        authenticated ? (
          <div className="container-fluid">
          <div className="row">
            <LeftBar/>
            <div id="rightColumn" className="col-xs-12 col-sm-12 col-md-9 h-100"> <NavBar/> </div>
          </div>
        </div>
        ) : (
          <Redirect to="/" />
        )
      }
    </AuthConsumer>
  );
}

export default Dashboard;