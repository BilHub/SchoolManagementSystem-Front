import axios from "axios";
import {api} from "../utils/backend.instance";

const fetchTeachersList = async () => {
  return api
    .get("api/v1/teachers/")
    .then((response) => {
      const data = response.data;
      const teachersList = data.map((item) => {
        return {
          id: item.id,
          value: `${item.last_name} ${item.first_name}`,
          label: `${item.last_name} ${item.first_name}`,
        };
      });
      return teachersList;
    });
};

const getTeachersList = async () => {
  return await api
    .get("api/v1/teachers/")
    .then((response) => response.data);
};

const deleteTeacher = async (id) => {
  return await api
    .delete(`api/v1/teachers/${id}`)
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};

const teachersService = { fetchTeachersList, getTeachersList, deleteTeacher };
export default teachersService;
