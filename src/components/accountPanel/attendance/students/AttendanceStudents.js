import React, { useEffect, useState } from "react";
import AttendancePart from "../commun/AttendancePart";
import SearchAttendanceStudents from "./SearchAttendanceStudents";
import attendanceService from "../../../../services/attendanceService";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setDateRedux,
  setSelectedClassIdRedux,
} from "../../../../redux/courseSlice";

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

  return (
    <div className="ml-52 mt-22 mr-10">
      <AttendancePart />
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
      <SearchAttendanceStudents refetch={refetch} />
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
        <ul>
          {attendanceList?.map((item) => {
            return (
              <li className="grid grid-cols-6 mt-5">
                <p>{item.date}</p>
                <p>{item.cycle}</p>
                <p>{item.level}</p>
                <p>{item.subject}</p>
                <p>{item.teacher}</p>
                <div className="flex gap-2 text-xl">
                  <button
                    onClick={() => navigate(`edit_attendance/${item.id}`)}
                  >
                    <AiFillEdit className="text-primary-yellow" />
                  </button>
                  <button>
                    <AiFillDelete className="text-red-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AttendanceStudents;
