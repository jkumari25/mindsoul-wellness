import axios from "axios";

const api = axios.create({
  baseURL: "https://mindsoul-backend-772700176760.asia-south1.run.app", // your backend
  withCredentials: false,
});

export default api;
