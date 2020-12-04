import React from "react";
import {Redirect} from "react-router-dom"
import {AuthConsumer} from "../auth/AuthContext";

const Callback = props => (
  <AuthConsumer>
    {({handleAuthentication}) => {
      if (/access_token|id_token|error/.test(props.location.hash)) {
        handleAuthentication();
      }
      return <Redirect to="/dashboard"/>;
    }}
  </AuthConsumer>
);

export default Callback;