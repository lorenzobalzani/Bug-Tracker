import './styles/App.css';
import './styles/Form.css';

import React from "react";
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, InputGroupText } from 'reactstrap';
import firebase from './Firebase';


class Input extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {projectName: "", projectDescription: "", projectManager: ""};
        this.ref = firebase.firestore().collection('projects');
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    createProject = (e) => {
        e.preventDefault();
        const { projectName, projectDescription, projectManager } = this.state;
        const timestamp = firebase.firestore.Timestamp.fromDate(new Date());
        this.ref.add({
          projectName,
          projectDescription,
          projectManager,
          timestamp
        }).then((docRef) => {
          this.setState({
            projectName: '',
            projectDescription: '',
            projectManager: ''
          });
          this.props.history.push("/myProjects");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

    updateField = (e) => {
        const state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state);
    }

    render() {
        return (<>
            <form>
                <div className="form-group row">
                    <label htmlFor="inputProjectName" className="col-sm-2 col-form-label">Project name</label>
                        <div className="col-sm-10">
                            <input type="text" value={this.state.projectName} 
                            onChange={this.updateField} className="form-control" id="projectName" placeholder="Project name"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputProjectDesc" className="col-sm-3 col-form-label">Project description</label>
                        <div className="col-sm-9">
                            <input type="text" value={this.state.projectDescription}
                             onChange={this.updateField} className="form-control" id="projectDescription" placeholder="Project description"/>
                        </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputProjectDesc" className="col-sm-3 col-form-label">Project manager</label>
                    <div className="col-sm-9">
                        <select id="projectManager" onChange={this.updateField} 
                        value={this.state.projectManager} className="form-control">
                            <option>Lorenzo Balzani</option>
                            <option>Gianluca Balzani</option>
                         </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" onClick={this.createProject} className="btn btn-primary">Create project</button>
                    </div>
                </div>
            </form>
        </>);
    }
}

function NewProject (props) {
    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Add new project</h1>
      </div>
      <Input history={props.history}/>
    </div>);
}

export default NewProject;