import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { DashboardData } from "../../../data/AdminPanel/DashboardData";
import { FaUserGraduate, FaUser, FaUserTie } from "react-icons/fa";
import { GiTeacher, GiReceiveMoney } from "react-icons/gi";
import { NumbersInfos } from "./NumbersInfos";
import StudentNumberGraph from "./StudentNumberGraph";
import FinanceBarChart from "./FinanceBarChart";
import SchoolCalendar from "../schedule/SchoolCalendar";

const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  return (
    <div className="ml-40">
      {isLoggedIn ? (
        <div className="my-10 flex flex-col items-center gap-5">
          <ul className="flex justify-center gap-32 items-center text-2xl text-white">
            {DashboardData.map((item) => {
              return (
                <li
                  key={item.id}
                  className="flex flex-col justify-center items-center bg-primary-green p-10 rounded rounded-lg gap-3
                hover: cursor-pointer hover:bg-primary-yellow
                "
                  onClick={() => navigate(user.subdomain + "/" + item.link)}
                >
                  <p className="text-5xl">{item.icon}</p>
                  <p>{item.title}</p>
                </li>
              );
            })}
          </ul>
          <ul className="flex justify-center items-center my-5 gap-10 text-xl">
            {NumbersInfos.map((item) => {
              return (
                <li
                  className="flex justify-center items-center gap-3 bg-gray-100 p-3 rounded rounded-lg"
                  key={item.id}
                >
                  <span className="text-5xl text-primary-green">
                    {item.icon}
                  </span>
                  <div className="text-center font-semibold italic">
                    <p>{item.title}</p>
                    <p className="text-primary-yellow">
                      {item.id == 1 ? 129 : item.id == 2 ? 10 : "1500$"}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <StudentNumberGraph />
          {/* <SchoolCalendar showToolBar={false} /> */}
          {/* <FinanceBarChart /> */}
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Dashboard;
