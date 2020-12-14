import http from "./HttpConfig";

export default class ProjectController {
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getProjects() {
    return http.get("/projects/getProjects", {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  getProjectById(id) {
    return http.get(`/projects/getProject/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  getProjectsByProjectManager(projectManagerEmail) {
    return http.get(`/projects/getProjectsByProjectManager/${projectManagerEmail}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    })
  }

  createProject(data) {
    return http.post("/projects/newProject", data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  updateProject(id, data) {
    return http.put(`/projects/updateProject/${id}`, data, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  deleteProjectById(id) {
    return http.delete(`/projects/deleteProject/${id}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }

  deleteAllProjects() {
    return http.delete(`/projects/deleteAllProjects`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      }
    });
  }
}