import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const bearerToken = Cookies.get("bearerToken");
    if (bearerToken) {
      config.headers["Authorization"] = `Bearer ${bearerToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
