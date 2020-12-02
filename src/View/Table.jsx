import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DeleteIcon, EditIcon, PeopleIcon } from './Styles/Icons';

function Table(props) {
        return (<div className="table-responsive">
        <table class="table table-striped table-bordered table-sm table-hover table-light" cellspacing="0"
        width="100%">
        <thead>
            {props.head.map(headTitle => 
            <th className="align-middle">{headTitle}</th>
            )}
        </thead>
        <tbody>
            {props.data.map(data =>
                    <tr>
                        {props.columns.map(columnName => {
                            let value = data[columnName]
                            return <td className="align-middle"> {value} </td>
                        })}
                    <td className="align-middle">
                    <Link to={"/"} className="btn btn-primary mr-2">
                        <PeopleIcon/>
                    </Link>
                    <button className="btn btn-primary mr-2">
                        <EditIcon/>
                    </button>
                    <button className="btn btn-primary">
                        <DeleteIcon/>
                    </button>
                    </td>
                    </tr>
                )}
        </tbody>
      </table>
    </div>);
}

export default Table;