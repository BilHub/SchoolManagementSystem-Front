import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";
import attendanceService from "../../../../services/attendanceService";
import SelectCourses from "../../courses/commun/SelectCourses";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import MultiSelectClass from "../../courses/commun/MultiSelectClass";

const FilterClassAttendance = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex justify-center items-center gap-5">
        <p className="text-xl font-semibold italic">Filter</p>
        <SelectCourses />
      </div>
      <div className="flex justify-center items-center gap-5">
        <p className="italic font-semibold text-xl mx-10">Or By</p>
        <DateSelectCourses />
      </div>
    </div>
  );
};

export default FilterClassAttendance;
