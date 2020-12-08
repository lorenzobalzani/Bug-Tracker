import './Styles/App.css';
import React, {useState} from "react"
import Table from './Table'
import UserController from '../Controller/User.Controller'

export default class EditUser extends React.Component { 
  constructor(props) {
    super(props);
    this.columns = ["email", "role"];
    this.headTitle = ["Email", "Role", "Actions"];
    this.state = {users: []};
  }

  componentDidMount() {
    new UserController().getAllUsers()
    .then(response => {
      this.setState({users: response.data});
    })
    .catch(e => {
      console.log(e);
    });
  }
   
   render() {
    return(
      <div className="content-container">
        <div className="content-title">
          <h1>Edit users</h1>
          <h2>You can see user details, edit or remove it!</h2>
        </div>
        <Table data={this.state.users} columns={this.columns} head={this.headTitle}/>
      </div>);
   }
}