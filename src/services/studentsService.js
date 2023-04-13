import axios from "axios";
import axiosInstance from "../apis";
import {api} from "../utils/backend.instance";

const fetchStudentsList = () => {
  return api.get("api/v1/students/").then((response) => response.data);
};

const deleteStudent = (id) => {
  api
    .delete(`api/v1/students/${id}/`)
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};

const studentsService = { fetchStudentsList, deleteStudent };
export default studentsService;
