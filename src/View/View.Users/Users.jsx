import '../Styles/App.css';
import React, { useState, useEffect } from "react"
import Table from '../Table'
import UserController from '../../Controller/User.Controller'
import { useAuth0 } from "@auth0/auth0-react";

export default class EditUser extends React.Component { 
  constructor(props) {
    super(props);
    this.columns = ["email"];
    this.headTitle = ["Email", "Actions"];
    this.state = {users: []};
    this.userController = new UserController();
  }

  componentDidMount() {
    this.userController.getAllUsers()
    .then(response => {
      let users = [];
      response.data.map(user => {
        users.push({"id": user.user_id, "email": user.email})
      });
      this.setState({
        users: users
      });
    })
    .catch(e => {
      console.log(e);
    });
  }
   
   render() {
    return(<div className="content-container">
    <div className="content-title">
      <h1>Edit users</h1>
      <h2>You can see user details, edit or remove it!</h2>
    </div>
    <Table data={this.state.users} columns={this.columns} head={this.headTitle}/>
    <GetUser/>
    </div>);
   }
}

function GetUser() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [ userMetadata, setUserMetadata ] = useState(null);

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "balzanilo.eu.auth0.com";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };})

    return(<div>{userMetadata}</div>)
}