import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/"  // let Nginx handle it
    : "http://localhost:5000";  // local dev

const api = axios.create({
  baseURL: API_BASE,
});


// Attach JWT from localStorage before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      alert("Session expired. Please login again.");
      localStorage.removeItem("token"); // clear old token
      window.location.href = "/login";  // redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
