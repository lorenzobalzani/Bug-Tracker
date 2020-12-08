import http from "./HttpConfig";

export default class UserController {
  getAllUsers() {
    return http.get(`/users/getAllUsers`);
  }

  getMe(developerEmail) {
    return http.get(`/tickets/getTicketsByDeveloperEmail/${developerEmail}`);
  }
}