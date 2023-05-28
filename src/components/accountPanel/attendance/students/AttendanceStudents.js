import React, { useEffect, useState } from "react";
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

  const [attendanceList, setAttendanceList] = useState([]);

  // const {
  //   data: queryAttendanceList = [],
  //   refetch,
  //   isLoading,
  //   error,
  // } = useQuery(
  //   [
  //     "daily-attendance",
  //     selectedCycleId,
  //     selectedLevelId,
  //     selectedClassId,
  //     date,
  //   ],
  //   () =>
  //     attendanceService.fetchingAttendance(
  //       selectedCycleId,
  //       selectedLevelId,
  //       selectedClassId,
  //       date
  //     )
  // );

  useEffect(() => {
    attendanceService
      .fetchingAllAttendance()
      .then((response) => setAttendanceList(response.data));
  }, []);
  useEffect(() => {
    if (date == "") {
      attendanceService
        .fetchingAllAttendance()
        .then((response) => setAttendanceList(response.data));
    } else
      attendanceService
        .fetchingDateAttendance(date)
        .then((response) => setAttendanceList(response.data));
  }, [date]);
  useEffect(() => {
    if (selectedCycleId == "default") {
      attendanceService
        .fetchingAllAttendance()
        .then((response) => setAttendanceList(response.data));
    } else
      attendanceService
        .fetchingCycleAttendance(selectedCycleId)
        .then((response) => setAttendanceList(response.data));
  }, [selectedCycleId]);
  useEffect(() => {
    if (selectedLevelId == "default") {
      attendanceService
        .fetchingCycleAttendance(selectedCycleId)
        .then((response) => setAttendanceList(response.data));
    } else
      attendanceService
        .fetchingLevelAttendance(selectedCycleId, selectedLevelId)
        .then((response) => setAttendanceList(response.data));
  }, [selectedLevelId]);
  useEffect(() => {
    if (selectedClassId == "default") {
      attendanceService
        .fetchingLevelAttendance(selectedCycleId, selectedLevelId)
        .then((response) => setAttendanceList(response.data));
    } else
      attendanceService
        .fetchingClassAttendance(
          selectedCycleId,
          selectedLevelId,
          selectedClassId
        )
        .then((response) => setAttendanceList(response.data));
  }, [selectedClassId]);

  // useEffect(() => {
  //   if (classList.length) {
  //     const value = classList[0].id;
  //     dispatch(setSelectedClassIdRedux(value.toString()));
  //   }
  // }, []);

  return (
    <div className="md:ml-52 md:mr-10 flex flex-col gap-5 mt-10">
      <FilterClassAttendance />
      <TableStudentAttendance studentAtendanceList={attendanceList} />
    </div>
  );
};

export default AttendanceStudents;
