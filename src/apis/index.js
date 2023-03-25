import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api/v1"
const axiosInstance = axios.create({
  baseURL: API_URL,
});

const Token = JSON.parse(localStorage.getItem("token"));

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.Authorization = `JWT ${Token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;