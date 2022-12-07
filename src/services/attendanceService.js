import axios from "axios";
import authHeader from "./authHeader";

const getDailyAttendance = () => {
  return axios.get("http://127.0.0.1:8000/api/v1/attendance/", {
    headers: authHeader(),
  });
};

// const viewAttendance = (cycle_id, level_id, subject_id, date) => {
//   return axios.get(
//     `http://127.0.0.1:8000/api/v1/attendance/?
//   cycle_id=${cycle_id}&level_id=${level_id}&subject_id=${subject_id}&date=${date}`,
//     {
//       headers: authHeader(),
//     }
//   );
// };

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

const attendanceService = { getDailyAttendance, fetchingAttendance };
export default attendanceService;
