import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AttendancePartData } from "../../../../data/AdminPanel/AttendancePartData";

const AttendancePartMedium = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const presentLink = location.pathname;
  return (
    <ul className="w-full justify-around my-5 text-2xl text-primary-green font-semibold italic hidden md:flex">
      {AttendancePartData.map((value, index) => (
        <Link
          to={user.subdomain + value.link}
          state="Attendance"
          className={
            presentLink == user.subdomain + value.link
              ? "text-primary-yellow"
              : ""
          }
        >
          <li key={value.id}>{value.title}</li>
        </Link>
      ))}
    </ul>
  );
};

export default AttendancePartMedium;
