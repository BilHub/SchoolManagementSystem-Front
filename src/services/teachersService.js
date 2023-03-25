import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const fetchTeachersList = async () => {
  return axios
    .get("http://127.0.0.1:8000/api/v1/teachers/", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
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
  return await axios
    .get("http://127.0.0.1:8000/api/v1/teachers/", {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((response) => response.data);
};

const deleteTeacher = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/v1/teachers/${id}`, {
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

const teachersService = { fetchTeachersList, getTeachersList, deleteTeacher };
export default teachersService;
