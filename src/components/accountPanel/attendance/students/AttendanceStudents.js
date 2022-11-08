import React, { useEffect, useState } from "react";
import AttendancePart from "../commun/AttendancePart";
import SearchAttendanceStudents from "./SearchAttendanceStudents";
import attendanceService from "../../../../services/attendanceService";

const AttendanceStudents = () => {
  const [dailyAttendanceList, setDailyAttendanceList] = useState([]);

  useEffect(() => {
    attendanceService.getDailyAttendance().then((response) => {
      if (response) {
        console.log("daily attendance list: ", response.data);
        setDailyAttendanceList(response.data);
      }
    });
  }, []);

  return (
    <div className="ml-52 mt-22 mr-10">
      <AttendancePart />
      <div className="flex justify-center w-full">
        <button className="w-[200px] bg-primary-yellow text-white p-1 rounded-full hover:scale-90 ">
          Add New Attendance
        </button>
      </div>
      <SearchAttendanceStudents />
      <div>
        <p className="text-3xl text-primary-green">Attendance List</p>
        <div className="grid grid-cols-6 mt-5">
          <p>Date</p>
          <p>Cycle</p>
          <p>Level</p>
          <p>Subject</p>
          <p>Teacher</p>
          <p>Action</p>
        </div>
        <div className="grid grid-cols-6 mt-5">
          <p>Date</p>
          <p>Cycle</p>
          <p>Level</p>
          <p>Class</p>
          <p className="col-span-2">Action</p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStudents;
