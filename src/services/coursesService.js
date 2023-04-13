import {api} from "../utils/backend.instance";

// const getClassList = () => {
//   return axiosInstance.get("subject/").then((response) => response.data);
// };

const getClassList = () => {
  return api
    .get("api/v1/subject/")
    .then((response) => response.data);
};

const getCycleList = () => {
  return api.get("api/v1/cycle/").then((response) => response.data);
};

// const getLevelList = (id) => {
//   return axiosInstance
//     .get(`level/?cycle_id=${id}`)
//     .then((response) => response.data);
// };

const getLevelList = (id) => {
  return api
    .get(`api/v1/level/?cycle_id=${id}`)
    .then((response) => response.data);
};

const fetchLevelList = () => {
  return api.get("api/v1/level/").then((response) => response.data);
};

const coursesService = {
  getClassList,
  getCycleList,
  getLevelList,
  fetchLevelList,
};
export default coursesService;
