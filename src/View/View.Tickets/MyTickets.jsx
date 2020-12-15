import '../Styles/App.css';

import React, { useState, useEffect, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MyTicketsProjectManager from './MyTickets.ProjectManager';
import MyTicketsDeveloper from './MyTickets.Developer';
import ConditionalRender from '../ConditionalRender';
import jwt from 'jsonwebtoken';

function MyTickets() {
  let [ permissions, setPermissions ] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const didMountRef = useRef(true);

  useEffect(() => {
    getAccessTokenSilently().then(token => {
           setPermissions((jwt.decode(token)).permissions);
    })
  }, []);

  if (ConditionalRender(permissions, "read:projects")) {
      return <MyTicketsProjectManager/> 
  } else if (ConditionalRender(permissions, "read:tickets")){
      return <MyTicketsDeveloper/>
  }
  return null;
}

export default MyTickets;