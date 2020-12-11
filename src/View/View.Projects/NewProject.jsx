import '../Styles/App.css';
import '../Styles/Form.css';
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import ProjectController from '../../Controller/Project.Controller';
import history from '../history'

function Input() {
    let [projectName, setProjectName] = useState("");
    let [projectDescription, setProjectDescription] = useState("");
    let [projectManager, setProjectManager] = useState("balzanilo@gmail.com");
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const projectController = new ProjectController();

    useEffect(() => {
        const getToken = async () => {
         try {
            const token = await getAccessTokenSilently();
            projectController.setAccessToken(token);
          } catch (e) {
            console.log(e.message);
          }
        };
        getToken();
    });

    const updateField = (e) => {
        switch (e.target.id) {
            case "projectName":
                setProjectName(e.target.value);
            break;
            case "projectDescription":
                setProjectDescription(e.target.value);
            break;
            case "projectManager":
                setProjectManager(e.target.value);
            break;
        }
    }

    const createProject = (e) => {
        e.preventDefault();
        projectController.createProject({
            projectName: projectName,
            projectDescription: projectDescription,
            projectManager: projectManager
        });
        history.push("/dashboard/myProjects")
    }

    return (<>
        <form>
            <div className="form-group row">
                <label htmlFor="inputProjectName" className="col-sm-2 col-form-label">Project name</label>
                    <div className="col-sm-10">
                        <input type="text" value={projectName} 
                        onChange={updateField} className="form-control" id="projectName" placeholder="Project name"/>
                    </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputProjectDesc" className="col-sm-3 col-form-label">Project description</label>
                    <div className="col-sm-9">
                        <input type="text" value={projectDescription}
                         onChange={updateField} className="form-control" id="projectDescription" placeholder="Project description"/>
                    </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputProjectDesc" className="col-sm-3 col-form-label">Project manager</label>
                <div className="col-sm-9">
                    <select id="projectManager" onChange={updateField} 
                    value={projectManager} id="projectManager" className="form-control">
                        <option>balzanilo@gmail.com</option>
                     </select>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-sm-10">
                    <button type="submit" onClick={createProject} className="btn btn-primary">Create project</button>
                </div>
            </div>
        </form>
    </>);
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