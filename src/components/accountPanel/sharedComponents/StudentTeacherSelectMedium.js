import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AttendancePartData } from "../../../data/AdminPanel/AttendancePartData";

const StudentTeacherSelectMedium = () => {
  const location = useLocation();
  const presentLink = location.pathname;
  return (
    <ul className="w-full justify-around my-5 text-2xl text-primary-green font-semibold italic hidden md:flex">
      {AttendancePartData.map((value, index) => (
        <Link
          key={index}
          to={
            value.title == "Students"
              ? presentLink.replace("teachers", "students")
              : presentLink.replace("students", "teachers")
          }
          state="Attendance"
          className={
            presentLink.split("/")[4] == value.title.toLowerCase()
              ? "text-primary-yellow"
              : ""
          }
        >
          <li>{value.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export default StudentTeacherSelectMedium;
