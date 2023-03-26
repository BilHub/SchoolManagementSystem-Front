import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("isLoggedIn: ", isLoggedIn);
  return (
    <div className="ml-80">
      {isLoggedIn ? (
        <div className="text-5xl mt-52 ml-64">ON DEVELOPEMENT ...</div>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Dashboard;
