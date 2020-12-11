import React , { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { DeleteIcon, EditIcon, PeopleIcon } from './Styles/Icons';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function Table(props) {
        const { path } = useRouteMatch();
        
        const [modal, setModal] = useState(false);

        const [id, setId] = useState();
        
        const toggle = (id) => {
            setModal(!modal);
            setId(id);
        }

        const handleDelete = () => {
            setModal(!modal);
            props.delete(id);
        }

        return (<div className="table-responsive">
        <table className="table table-striped table-bordered table-sm table-hover table-light" cellSpacing="0"
        width="100%">
        <thead>
            <tr>
                {props.head.map(headTitle => 
                    <th key={headTitle} className="align-middle">{headTitle}</th>
                )}
            </tr>
        </thead>
        <tbody>
            {props.data.map(data =>
                    <tr key={data}>
                        {props.columns.map(columnName => {
                            let value = data[columnName]
                            return <td key={columnName} className="align-middle"> {value} </td>
                        })}
                    <td key="actions" className="align-middle">
                    <Link to={`${path}/${data.id}/details`} className="btn btn-primary mr-2">
                        <PeopleIcon/>
                    </Link>
                    <Link to={`${path}/${data.id}/edit`} className="btn btn-primary mr-2">
                        <EditIcon/>
                    </Link>
                    <button onClick={() => toggle(data.id)} className="btn btn-primary">
                        <DeleteIcon/>
                    </button>
                    </td>
                    </tr>
                )}
        </tbody>
      </table>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Delete confirm</ModalHeader>
        <ModalBody>
        {props.modalText}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button color="primary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>);
}

export default Table;