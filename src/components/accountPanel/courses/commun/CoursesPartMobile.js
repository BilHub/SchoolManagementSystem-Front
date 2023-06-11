import React, { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { CoursesPartsData } from "../../../../data/AdminPanel/CoursesPartsData";
<<<<<<< HEAD
const CoursePartMobile = () => {
  const location = useLocation();
  const prsentLink = location.pathname;
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

=======

const CoursePartMobile = () => {
  const location = useLocation();
  const prsentLink = location.pathname;
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

>>>>>>> 57605ac4c1da55c38a102c0ca39781f5acdcbac3
  return (
    <div className="relative flex justify-center">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-2 right-4 inline-flex text-4xl text-primary-yellow gap-3 items-center mr-3 z-50"
      >
        <p className="md:hidden text-lg">Course Type</p>
        <AiOutlineMenuFold className="block md:hidden" />
      </button>

      <ul
        className={`fixed h-screen pt-16 bottom-[500px]  ${
          showMenu ? "top-10 w-full backdrop-blur-md z-40" : "-z-10"
        }`}
      >
        {CoursesPartsData.map((value, index) => {
          return (
            <Link
              to={user.subdomain + value.link}
              state={"Users"}
              className={value.link === prsentLink ? "text-primary-yellow" : ""}
            >
              <li
                key={index}
                className="flex flex-col items-center text-xl my-5 text-primary-green font-semibold"
              >
                <div className={value.title === "Parents" ? "text-2xl" : ""}>
                  {value.icon}
                </div>
                <div>{value.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursePartMobile;
