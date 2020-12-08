import '../Styles/App.css';
import React from "react"
import Table from '../Table'
import UserController from '../../Controller/User.Controller'

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
    </div>);
   }
}