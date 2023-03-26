import axios from "axios";
import authHeader from "./authHeader";

const getStudentsDailyAttendance = (id) => {
  return axios
    .get(`http://127.0.0.1:8000/api/v1/attendance/${id}`, {
      headers: authHeader(),
    })
    .then((response) => response.data);
};

export const fetchingAttendance = (id1, id2, id3, d) => {
  return axios
    .get(
      `http://127.0.0.1:8000/api/v1/attendance/?cycle_id=${id1}&level_id=${id2}&subject_id=${id3}&date=${d}`,
      {
        headers: authHeader(),
      }
    )
    .then((response) => response.data);
};

const attendanceService = { getStudentsDailyAttendance, fetchingAttendance };
export default attendanceService;
