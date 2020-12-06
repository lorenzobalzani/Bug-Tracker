import http from "./HttpConfig";

export default class ProjectController {
  getProjects() {
    return http.get("/projects/getProjects");
  }

  getProjectById(id) {
    return http.get(`/projects/getProject/${id}`);
  }

  getProjectsByProjectManager(projectManagerEmail) {
    return http.get(`/projects/getProjectsByProjectManager/${projectManagerEmail}`);
  }

  createProject(data) {
    return http.post("/projects/newProject", data);
  }

  updateProject(id, data) {
    return http.put(`/projects/updateProject/${id}`, data);
  }

  deleteProjectById(id) {
    return http.delete(`/projects/deleteProject/${id}`);
  }

  deleteAllProjects() {
    return http.delete(`/projects/deleteAllProjects`);
  }
}