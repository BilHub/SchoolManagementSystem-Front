import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import attendanceService from "../../../../services/attendanceService";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import teachersService from "../../../../services/teachersService";

const EditDailyAttendance = ({
  date,
  setDate,
  currentTeacher,
  setCurrentTeacher,
}) => {
  const { data: teachersList = [] } = useQuery(
    ["teachers-list"],
    teachersService.fetchTeachersList
  );

  return (
    <div className="flex flex-col mt-10 gap-3">
      <div className="flex justify-around">
        <div className="flex gap-2">
          <p>Cycle:</p>
          <p>Lycée</p>
        </div>
        <div className="flex gap-2">
          <p>Level:</p>
          <p>3ème année lycée</p>
        </div>
        <div className="flex gap-2">
          <p>Subject:</p>
          <p>L/science</p>
        </div>
      </div>
      <div className="flex justify-around">
        <Select
          options={teachersList}
          className="w-[300px]"
          onChange={(value) => {
            setCurrentTeacher(value);
          }}
          value={currentTeacher}
        />
        <input
          className=""
          type="date"
          name="date"
          // defaultValue={date}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="bg-primary-green rounded-md w-[100px] text-white font-semibold hover:bg-primary-yellow">
          Modify
        </button>
      </div>
    </div>
  );
};

export default EditDailyAttendance;
