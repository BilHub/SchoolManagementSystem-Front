import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-[32px] flex justify-between p-3 items-center bg-white">
      <div className="text-5xl">
        <Link to="/">LOGO</Link>
      </div>
      <div className="flex text-primary-green items-center">
        <ul className="flex gap-10 text-xl font-semibold">
          <li className="flex">
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contacts">Contacts</Link>
          </li>
        </ul>
      </div>
      <div className="text-white">
        <button className="mr-5 bg-primary-green p-2 rounded-md">
          <Link to="/register"> My Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
