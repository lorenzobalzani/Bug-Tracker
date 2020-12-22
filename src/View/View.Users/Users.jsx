import '../Styles/App.css';
import React, { useState, useEffect } from "react"
import Table from '../View.Utility/Table'
import UserController from '../../Controller/User.Controller'
import { useAuth0 } from "@auth0/auth0-react";


function EditUser () {
  const headTitle = ["Email", "Actions"];
  const columns = ["email"];
  const userController = new UserController();
  let [users, setUsers] = useState([]);
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  
  useEffect(() => {
    const getUsers = async () => {
     try {
        const token = await getAccessTokenSilently({
          audiance: "https://balzanilo.eu.auth0.com/api/v2/",
          scope: "read_users"
        });
        userController.setAccessToken(token);
        userController.getAllUsers()
          .then(response => {
            let users = [];
            response.data.map(user => {
              users.push({"id": user.user_id, "email": user.email})
            });
            setUsers(users)
          })
          .catch(e => {
            console.log(e);
          });
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUsers();
  }, []);

  const deleteUserById = (id) => {
    userController.deleteUserById(id);
  }

  return(
    <div className="content-container">
      <div className="content-title">
        <h1>Edit users</h1>
        <h2>You can see user details, edit or remove it!</h2>
      </div>
        <Table modalText={"Are you sure to delete this user?"} 
        delete={deleteUserById} data={users} 
        columns={columns} head={headTitle}/>
    </div>
    );
}

export default EditUser;