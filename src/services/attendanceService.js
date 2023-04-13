import {api} from "../utils/backend.instance";

const getStudentsDailyAttendance = async (id) => {
  return await api
    .get(`api/v1/attendance/${id}`)
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
  return await api.get(
    `api/v1/attendance/?cycle_id=${id1}&level_id=${id2}&subject_id=${id3}`
  );
};

export const fetchingLevelAttendance = async (id1, id2) => {
  return await api.get(
    `api/v1/attendance/?cycle_id=${id1}&level_id=${id2}`
  );
};

export const fetchingCycleAttendance = async (id1) => {
  return await api.get(
    `api/v1/attendance/?cycle_id=${id1}`
  );
};

export const fetchingDateAttendance = async (d) => {
  return await api.get(`api/v1/attendance/?date=${d}`);
};

export const fetchingAllAttendance = async () => {
  return await api.get("api/v1/attendance/");
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
