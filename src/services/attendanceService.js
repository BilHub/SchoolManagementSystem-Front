import axios from "axios";
import authHeader from "./authHeader";

const token = JSON.parse(localStorage.getItem("token"));

const getStudentsDailyAttendance = async (id) => {
  return await axios
    .get(`http://127.0.0.1:8000/api/v1/attendance/${id}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    })
    .then((response) => response.data);
};

// export const fetchingAttendance = (id1, id2, id3, d) => {
//   return axios
//     .get(
//       `http://127.0.0.1:8000/api/v1/attendance/?cycle_id=${id1}&level_id=${id2}&subject_id=${id3}&date=${d}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           accept: "application/json",
//           Authorization: "JWT " + token,
//         },
//       }
//     )
//     .then((response) => response.data);
// };

export const fetchingClassAttendance = async (id1, id2, id3) => {
  return await axios.get(
    `http://127.0.0.1:8000/api/v1/attendance/?cycle_id=${id1}&level_id=${id2}&subject_id=${id3}`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    }
  );
};

export const fetchingLevelAttendance = async (id1, id2) => {
  return await axios.get(
    `http://127.0.0.1:8000/api/v1/attendance/?cycle_id=${id1}&level_id=${id2}`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    }
  );
};

export const fetchingCycleAttendance = async (id1) => {
  return await axios.get(
    `http://127.0.0.1:8000/api/v1/attendance/?cycle_id=${id1}`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    }
  );
};

export const fetchingDateAttendance = async (d) => {
  return await axios.get(`http://127.0.0.1:8000/api/v1/attendance/?date=${d}`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "JWT " + token,
    },
  });
};

export const fetchingAllAttendance = async () => {
  return await axios.get("http://127.0.0.1:8000/api/v1/attendance/", {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      Authorization: "JWT " + token,
    },
  });
};

const attendanceService = {
  getStudentsDailyAttendance,
  fetchingClassAttendance,
  fetchingAllAttendance,
  fetchingCycleAttendance,
  fetchingLevelAttendance,
  fetchingDateAttendance,
};
export default attendanceService;
