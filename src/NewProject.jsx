import './styles/App.css';
import './styles/Form.css';

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button, InputGroupText } from 'reactstrap';

function Input() {
    return (<>
        <form>
            <div class="form-group row">
                <label htmlFor="inputProjectName" class="col-sm-2 col-form-label">Project name</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputProjectName" placeholder="Project name"/>
                    </div>
            </div>
            <div class="form-group row">
                <label htmlFor="inputProjectDesc" class="col-sm-3 col-form-label">Project description</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputProjectDesc" placeholder="Project description"/>
                    </div>
            </div>
            <div class="form-group row">
                <label htmlFor="inputProjectDesc" class="col-sm-3 col-form-label">Project manager</label>
                <div class="col-sm-9">
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                     </select>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-10">
                    <button type="submit" class="btn btn-primary">Create project</button>
                </div>
            </div>
        </form>
    </>);
}

function NewProject () {
    return(
    <div className="table-container">
      <div className="tableTitle">
        <h1>Add new project</h1>
      </div>
      <Input/>
    </div>);
}

export default NewProject;