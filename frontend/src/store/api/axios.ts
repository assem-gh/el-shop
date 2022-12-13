import axios from "axios";

const baseURL = import.meta.env.VITE_RESOURCE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
