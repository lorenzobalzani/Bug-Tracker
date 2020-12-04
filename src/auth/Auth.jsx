import React, { Component } from "react";
import auth0 from "auth0-js";

import { AUTH_CONFIG } from "./AuthVariables";
import { AuthProvider } from "./AuthContext";

const auth = new auth0.WebAuth({
  domain: AUTH_CONFIG.domain,
  clientID: AUTH_CONFIG.clientId,
  redirectUri: AUTH_CONFIG.callbackUrl,
  audience: `https://${AUTH_CONFIG.domain}/userinfo`,
  responseType: "token id_token"
});

class Auth extends Component {
  state = {
    authenticated: false,
    user: {
      role: "visitor"
    },
    accessToken: ""
  };

  initiateLogin = () => {
    console.log("Called method")
    auth.authorize();
  };

  logout = () => {
    this.setState({
      authenticated: false,
      user: {
        role: "visitor"
      },
      accessToken: ""
    });
    window.location = "https://" + AUTH_CONFIG.domain + 
                      "/v2/logout?returnTo=" + AUTH_CONFIG.callbackUrl + 
                      "&client_id=" + AUTH_CONFIG.clientId;
  };

  handleAuthentication = () => {
    auth.parseHash((error, authResult) => {
      if (error) {
        console.log(error);
        console.log(`Error ${error.error} Occured`);
        return;
      }

      this.setSession(authResult.idTokenPayload);
    });
  };

  setSession(data) {
    const user = {
      id: data.sub,
      email: data.email,
      role: data[AUTH_CONFIG.roleUrl]
    };
    this.setState({
      authenticated: true,
      accessToken: data.accessToken,
      user
    });
  }

  render() {
    const authProviderValue = {
      ...this.state,
      initiateLogin: this.initiateLogin,
      handleAuthentication: this.handleAuthentication,
      logout: this.logout
    };
    return (
      <AuthProvider value={authProviderValue}>
        {this.props.children}
      </AuthProvider>
    );
  }
}

export default Auth;