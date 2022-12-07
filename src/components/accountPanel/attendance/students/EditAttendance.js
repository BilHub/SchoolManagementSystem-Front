import React from "react";
import EditDailyAttendance from "./EditDailyAttendance";
import EditStudentAttendance from "./EditStudentAttendance";

const EditAttendance = () => {
  return (
    <div className="flex flex-col ml-40 gap-10">
      <EditDailyAttendance />
      <EditStudentAttendance />
    </div>
  );
};

export default EditAttendance;
