import http from "./HttpConfig";

export default class TicketController {
  getTicketsByProjectName(projectName) {
    return http.get(`/tickets/getTicketsByProjectName/${projectName}`);
  }

  getTicketsByDeveloperEmail(developerEmail) {
    return http.get(`/tickets/getTicketsByDeveloperEmail/${developerEmail}`);
  }

  createTicket(data) {
    return http.post("/tickets/newTicket", data);
  }
}