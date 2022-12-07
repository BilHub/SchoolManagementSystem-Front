import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const fetchStudentsList = () => {
  return axios
    .get("http://127.0.0.1:8000/api/v1/students/", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((response) => response.data);
};

const deleteStudent = (id) => {
  axios
    .delete(`http://127.0.0.1:8000/api/v1/students/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((res) => {
      window.location.reload(false);
    })
    .catch((err) => console.log(err));
};

const studentsService = { fetchStudentsList, deleteStudent };
export default studentsService;
