import '../Styles/App.css';
import '../Styles/Form.css';

import React from "react";
import ProjectController from '../../Controller/Project.Controller';


class Input extends React.Component{ 
    constructor(props) {
        super(props);
        this.state = {projectName: "", projectDescription: "", projectManager: "balzanilo@gmail.com"};
        this.projectController = new ProjectController();
    }

    createProject = (e) => {
        e.preventDefault();
        this.projectController.createProject(this.state);
    }

    updateField = (e) => {
        const state = this.state;
        state[e.target.id] = e.target.value;
        console.log(state);
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
                        value={this.state.projectManager} id="projectManager" className="form-control">
                            <option>balzanilo@gmail.com</option>
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

function NewProject () {
    return(
    <div className="content-container">
      <div className="content-title">
        <h1>Add new project</h1>
      </div>
      <Input/>
    </div>);
}

export default NewProject;