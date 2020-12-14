import http from "./HttpConfig";

export default class TicketController {
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getTicketsByProjectId(projectId) {
    return http.get(`/tickets/getTicketsByProjectId/${projectId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  getTicketsByDeveloperEmail(developerEmail) {
    return http.get(`/tickets/getTicketsByDeveloperEmail/${developerEmail}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  createTicket(data) {
    return http.post("/tickets/newTicket", data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  deleteTicketById(id) {
    return http.delete(`/tickets/deleteTicket/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  deleteTicketsByProjectId(projectId) {
    return http.delete(`/tickets/deleteByProjectId/${projectId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }
}