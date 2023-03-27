import axios from "axios";
import axiosInstance from "../apis";

const token = JSON.parse(localStorage.getItem("token"));

// const getClassList = () => {
//   return axiosInstance.get("subject/").then((response) => response.data);
// };

const getClassList = () => {
  return axios
    .get("http://127.0.0.1:8000/api/v1/subject/", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((response) => response.data);
};

const getCycleList = () => {
  return axiosInstance.get("cycle/").then((response) => response.data);
};

// const getLevelList = (id) => {
//   return axiosInstance
//     .get(`level/?cycle_id=${id}`)
//     .then((response) => response.data);
// };

const getLevelList = (id) => {
  return axios
    .get(`http://127.0.0.1:8000/api/v1/level/?cycle_id=${id}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((response) => response.data);
};

const fetchLevelList = () => {
  return axiosInstance.get("level/").then((response) => response.data);
};

const coursesService = {
  getClassList,
  getCycleList,
  getLevelList,
  fetchLevelList,
};
export default coursesService;
