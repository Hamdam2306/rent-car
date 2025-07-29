import axios from "axios";

const api = axios.create({
  baseURL: "https://rentcar-production-9073.up.railway.app", // bazaviy URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
