import axios from "axios";

const api = axios.create({
  baseURL: "https://mindsoul-backend-772700176760.asia-south1.run.app", // your backend
  withCredentials: true,
});

export default api;

// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://mindsoul-backend-772700176760.asia-south1.run.app",
// });

// // Attach token automatically
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   } else {
//     console.warn("NO TOKEN FOUND IN LOCALSTORAGE");
//   }

//   return config;
// });

// export default api;
