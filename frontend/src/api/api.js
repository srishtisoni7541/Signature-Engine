import axios from "axios";

const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:4000/pdf";
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
