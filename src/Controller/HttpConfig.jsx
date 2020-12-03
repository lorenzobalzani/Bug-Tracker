import axios from "axios";

export default axios.create({
  baseURL: "https://bug-tracker-server-balzani.herokuapp.com/api/",
  headers: {
    "Content-type": "application/json"
  }
});