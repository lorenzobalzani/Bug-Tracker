import http from "./HttpConfig";

export default class TicketController {
  getTicketsByProjectId(projectId) {
    return http.get(`/tickets/getTicketsByProjectId/${projectId}`);
  }

  getTicketsByDeveloperEmail(developerEmail) {
    return http.get(`/tickets/getTicketsByDeveloperEmail/${developerEmail}`);
  }

  createTicket(data) {
    return http.post("/tickets/newTicket", data);
  }

  deleteTicketById(id) {
    return http.delete(`/tickets/deleteTicket/${id}`);
  }

  deleteTicketsByProjectId(projectId) {
    return http.delete(`/tickets/deleteByProjectId/${projectId}`);
  }
}