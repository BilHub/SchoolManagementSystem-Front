import React, { useEffect } from "react";
import attendanceService from "../../../../services/attendanceService";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { BiShow } from "react-icons/bi";

import {
  setDateRedux,
  setSelectedClassIdRedux,
} from "../../../../redux/courseSlice";
import StudentTeacherSelect from "../../sharedComponents/StudentTeacherSelect";
import FilterClassAttendance from "./FilterClassAttendance";
import TableStudentAttendance from "./TableStudentAttendance";

const AttendanceStudents = () => {
  const navigate = useNavigate();
  const { selectedCycleId, selectedLevelId, selectedClassId, date, classList } =
    useSelector((state) => state.courses);
  const dispatch = useDispatch();

  const {
    data: attendanceList = [],
    refetch,
    isLoading,
    error,
  } = useQuery(
    [
      "daily-attendance",
      selectedCycleId,
      selectedLevelId,
      selectedClassId,
      date,
    ],
    () =>
      attendanceService.fetchingAttendance(
        selectedCycleId,
        selectedLevelId,
        selectedClassId,
        date
      )

    // {
    //   enabled: false,
    // }
  );

  useEffect(() => {
    if (classList.length) {
      const value = classList[0].id;
      dispatch(setSelectedClassIdRedux(value.toString()));
    }
  }, []);

  console.log("attendanceList: ", attendanceList);

  return (
    <div className="ml-52 mr-10 flex flex-col gap-5 mt-10">
      {/* <StudentTeacherSelect /> */}
      <div className="flex justify-center w-full">
        <button
          className="w-[200px] bg-primary-yellow text-white p-1 rounded-full hover:scale-90 "
          onClick={() => {
            dispatch(setDateRedux(""));
            navigate("add_attendance");
          }}
        >
          Add New Attendance
        </button>
      </div>
      <FilterClassAttendance />
      <TableStudentAttendance studentAtendanceList={attendanceList} />
    </div>
  );
};

export default AttendanceStudents;
