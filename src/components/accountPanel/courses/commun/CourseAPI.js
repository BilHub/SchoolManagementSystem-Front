import axios from "axios";

const getCyclelListAPI = () => {
  return (
    axios
      .get("http://127.0.0.1:8000/api/v1/cycle/", {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
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
        },
      })
      // .then((response) => setLevelList(response.data))
      .catch((error) => console.log(error))
  );
};

const getClassListAPI = (cycle_id, level_id) => {
  return (
    axios
      .get(
        `http://127.0.0.1:8000/api/v1/subject/?cycle_id=${cycle_id}&level_id=${level_id}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
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
