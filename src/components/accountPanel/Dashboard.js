import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  console.log("isLoggedIn: ", isLoggedIn);
  return (
    <div className="ml-80">
      {isLoggedIn ? "Dashboard" : <Navigate to="/login" />}
    </div>
  );
};

export default Dashboard;
