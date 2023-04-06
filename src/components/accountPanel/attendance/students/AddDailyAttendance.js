import React from "react";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import SelectCourses from "../../courses/commun/SelectCourses";

const AddDailyAttendance = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="flex justify-center items-center gap-5">
        <SelectCourses />
      </div>
      <div className="flex justify-center items-center gap-5">
        <DateSelectCourses />
        <div className="flex flex-col my-5 gap-3">
          <div className="flex gap-1">
            <span className="text-primary-green font-semibold">Teacher:</span>
            <select>
              <option>Teacher1</option>
              <option>Teacher2</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDailyAttendance;
