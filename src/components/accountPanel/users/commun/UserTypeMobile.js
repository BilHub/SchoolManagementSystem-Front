import React, { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserTypeData } from "../../../../data/AdminPanel/UsersTypeData";
import { useSelector } from "react-redux";

const UserTypeMobile = () => {
  const location = useLocation();
  const prsentLink = location.pathname;
  const { user } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative flex justify-center">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="absolute top-2 right-4 inline-flex peer text-4xl text-primary-yellow gap-3 items-center mr-3 z-50"
      >
        <p className="md:hidden text-lg">User Type</p>
        <AiOutlineMenuFold className="block md:hidden" />
      </button>

      <ul
        className={`fixed h-screen pt-16 bottom-[500px]  ${
          showMenu ? "top-10 w-full backdrop-blur-md z-40" : ""
        }`}
      >
        {UserTypeData.map((value, index) => {
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

export default UserTypeMobile;
