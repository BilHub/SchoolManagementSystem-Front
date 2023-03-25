import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";
import attendanceService from "../../../../services/attendanceService";
import SelectCourses from "../../courses/commun/SelectCourses";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import MultiSelectClass from "../../courses/commun/MultiSelectClass";

const FilterClassAttendance = () => {
  return (
    <div className="flex items-center justify-center gap-10">
      <SelectCourses />
      <DateSelectCourses />
    </div>
  );
};

export default FilterClassAttendance;
