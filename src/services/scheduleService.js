import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const getEventList = () => {
  return (axios.get("http://127.0.0.1:8000/api/v1/schedule/", {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "JWT " + token,
    },
  }))
};

const scheduleService = { getEventList };
export default scheduleService;
