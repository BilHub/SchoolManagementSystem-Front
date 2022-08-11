import React from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex flex-col bg-primary-green h-screen items-center">
      <div className="flex flex-col bg-white gap-3 p-5 mt-20 w-96 text-xs">
        <div className="flex text-3xl gap-5">
          <p className="text-primary-green font-bold">Login</p>
          <span>|</span>
          <p>
            <Link to="/register">Register</Link>
          </p>
        </div>
        <input
          type="text"
          placeholder="username"
          className="outline-none border p-2 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          className="outline-none border p-2 rounded-md"
        />
      </div>
      <button className="m-5 rounded-md bg-white p-2 text-primary-green font-semibold hover:bg-primary-green hover:text-white">
        Login
      </button>
    </div>
  );
};

export default LoginForm;
