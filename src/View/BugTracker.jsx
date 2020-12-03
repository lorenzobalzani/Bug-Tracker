import './Styles/App.css';
import React from "react";
import {
  Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import EditUser from './Users';
import Home from './Home';
import { createBrowserHistory } from "history";
import MyProjects from './MyProjects';
import NewProject from './NewProject';
import { useAuth0 } from "@auth0/auth0-react";

function LeftBar() {
  const { logout } = useAuth0();
  return (
    <div id="leftColumn" className="col-xs-12 col-sm-12 col-md-3 d-flex justify-content-center">
      <ul>
      <li>
        <Link to="/" className="buttonNav py-3 btn btn-block"><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-house" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
        </svg>Home</Link></li>
        <li>
        <Link to="/editUser" className="buttonNav py-3 btn btn-block">  <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-people" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1h7.956a.274.274 0 0 0 .014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 0 0 .022.004zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>Edit users</Link></li>
        <li><Link to="/myProjects" className="buttonNav py-3 btn btn-block">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-kanban" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M13.5 1h-11a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm-11-1a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-11z"/>
        <path d="M6.5 3a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm-4 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3zm8 0a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3z"/>
        </svg>My projects</Link></li>
        <li><Link to="#" className="buttonNav py-3 btn btn-block">
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-list-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
        </svg>My tickets</Link></li>
        <li><a className="buttonNav py-3 btn btn-block" onClick={() => logout({ returnTo: window.location.origin })}>
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
        </svg> Logout
        </a>
        </li>
      </ul>
    </div>
  );
}

function NavBar(props){
  const { user, isAuthenticated, isLoading } = useAuth0();
  return(<div>
      <div id="nav" className="maxHeight row align-items-center">
          <h1>Logged in as {user.name}</h1>
      </div>
      <div id="content" className="row">
        <Switch>
            <Route exact path ="/" component = {Home}/>
            <Route path="/editUser" component = {EditUser}/>
            <Route history={props.history} exact path="/myProjects/newProject" component = {NewProject}/>
            <Route path="/myProjects" component = {MyProjects}/>
        </Switch>
      </div>
  </div>
    )
}

const history = createBrowserHistory();

export default class BugTracker extends React.Component {
    render() {
        return (<div className="container-fluid">
          <Router history={history}>
            <div className="row">
              <LeftBar/>
              <div id="rightColumn" className="col-xs-12 col-sm-12 col-md-9 h-100"> <NavBar history={history}/> </div>
            </div>
          </Router>
          </div>
         );
    }
}