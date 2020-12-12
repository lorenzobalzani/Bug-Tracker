import axios from "axios";

const http = axios.create({
  baseURL: "https://balzanilo.eu.auth0.com/api/v2"
});

export default class UserController {
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getAllUsers() {
    return http.get("/users", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  //TODO
  deleteUserById(id) {
    
  }

  getRoles() {
    return http.get(`/roles`);
  }

  getMyRole(userId) {
    return http.get(`/users/${userId}/roles`);
  }
}