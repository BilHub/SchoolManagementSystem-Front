import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CoursesPartsData } from "../../../../data/AdminPanel/CoursesPartsData";

const CoursesPartMedium = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const presentLink = location.pathname;
  return (
    <div>
      <ul className="my-5 justify-around text-primary-green font-semibold italic hidden md:flex">
        {CoursesPartsData.map((value, index) => {
          return (
            <Link
              to={user.subdomain + value.link}
              state={"Courses"}
              className={
                presentLink == user.subdomain + value.link
                  ? "text-primary-yellow"
                  : ""
              }
            >
              <li className="flex flex-col items-center text-xl" key={index}>
                <div>{value.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursesPartMedium;
