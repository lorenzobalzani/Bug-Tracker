import '../Styles/App.css';
import React from "react"
import UserController from '../../Controller/User.Controller';
import {useParams} from "react-router-dom";

class Input extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {roles: []};
        this.userId = props.userId;
        this.userController = new UserController();
    }

    componentDidMount() {
        this.userController.getMyRole(this.userId)
        .then(response => {
            this.setState({roles: response.data});
        })
        .catch(e => {
          console.log(e);
        });      
    }

    render() {
        return (<>
            <label>Roles for this user are</label> 
            <ul>
            {this.state.roles.map(role => <li>{role.name}</li>)}
            </ul>
        </>);
    }
}

function ChangeUserDetails () {
    let { userId } = useParams();
    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Change user role</h1>
      </div>
      <Input userId = {userId}/>
    </div>);
}

export default ChangeUserDetails;