import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const getCyclelListAPI = () => {
  return (
    axios
      .get("http://127.0.0.1:8000/api/v1/cycle/", {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      // .then((res) => {
      //   return res.data;
      // })
      .catch((error) => console.log(error))
  );
};

const getLevelListAPI = (id) => {
  return (
    axios
      .get(`http://127.0.0.1:8000/api/v1/level/?cycle_id=${id}`, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      // .then((response) => setLevelList(response.data))
      .catch((error) => console.log(error))
  );
};

const getClassListAPI = (id1, id2) => {
  return (
    axios
      .get(
        `http://127.0.0.1:8000/api/v1/subject/?cycle_id=${id1}&level_id=${id2}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
            Authorization: "JWT " + token,
          },
        }
      )
      // .then((response) => {
      //   setClassList(response.data);
      //   console.log("classList: ", response.data);
      // })
      .catch((error) => console.log(error))
  );
};

const coursesAPI = { getCyclelListAPI, getLevelListAPI, getClassListAPI };
export default coursesAPI;
