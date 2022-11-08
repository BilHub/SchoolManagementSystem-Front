import axios from "axios";
import authHeader from "./authHeader";

const getDailyAttendance = () => {
  return axios.get("http://127.0.0.1:8000/api/v1/attendance/", {
    headers: authHeader(),
  });
};

const attendanceService = { getDailyAttendance };
export default attendanceService;
