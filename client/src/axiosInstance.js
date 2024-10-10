import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: `${apiURL}/api/`,
  withCredentials: true,
}
);

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
