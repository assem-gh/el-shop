import axios from "axios";
import keycloak from "../../utils/keycloack";

const baseURL = import.meta.env.VITE_RESOURCE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  if (keycloak.authenticated) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["Authorization"] = `Bearer ${keycloak.token}`;
  }
  return Promise.resolve(config);
});

export default axiosInstance;
