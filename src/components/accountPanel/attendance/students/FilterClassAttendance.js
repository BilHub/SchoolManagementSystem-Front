import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";
import attendanceService from "../../../../services/attendanceService";
import SelectCourses from "../../courses/commun/SelectCourses";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import MultiSelectClass from "../../courses/commun/MultiSelectClass";

const FilterClassAttendance = ({ refetch }) => {
  return (
    <div>
      <SelectCourses />
      <div className="flex gap-10 items-center my-5">
        <DateSelectCourses />
        <button
          className="bg-primary-green rounded-md px-2 text-white hover:bg-primary-yellow"
          onClick={refetch}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default FilterClassAttendance;
