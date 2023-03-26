import axiosInstance from "../apis";

const getClassList = () => {
  return axiosInstance.get("subject/").then((response) => response.data);
};

const getCycleList = () => {
  return axiosInstance.get("cycle/").then((response) => response.data);
};

const getLevelList = (id) => {
  return axiosInstance
    .get(`level/?cycle_id=${id}`)
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
