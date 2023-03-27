import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="text-3xl home-image w-100 relative">
        <div className="flex flex-col absolute top-8  mx-8 justify-center items-center gap-3">
          <p className="text-3xl text-white">
            Welcome to the platform for School Management System
          </p>
          <Link to="/login">
            <p className="bg-white rounded-md p-1 text-lg text-primary-green font-semibold">
              Getting Started
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
