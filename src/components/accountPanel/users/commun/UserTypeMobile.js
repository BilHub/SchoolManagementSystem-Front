import React, { useState } from "react";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { UserTypeData } from "../../../../data/AdminPanel/UsersTypeData";

const UserTypeMobile = () => {
  const location = useLocation();
  const prsentLink = location.pathname;
  const [showUserType, setShowUsertype] = useState(false);

  return (
    <div className="relative flex justify-center">
      <button
        className="absolute top-2 right-4 inline-flex peer text-4xl text-primary-yellow"
        onClick={() => setShowUsertype(!showUserType)}
      >
        <AiOutlineMenuFold className="block md:hidden" />
      </button>

      <ul className="fixed pt-10 bottom-[300px] peer-focus:top-10 h-screen peer-focus:w-full peer-focus:backdrop-blur-md">
        {UserTypeData.map((value, index) => {
          return (
            <Link
              to={value.link}
              state={"Users"}
              className={value.link === prsentLink ? "text-primary-yellow" : ""}
            >
              <li key={index} className="flex flex-col items-center text-xl ">
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
