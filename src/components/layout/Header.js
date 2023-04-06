import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="sticky top-[32px] flex justify-center p-3 items-center bg-white z-10">
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
        <button className="bg-primary-green p-2 rounded-md absolute top-0 right-0 mr-5 mt-2">
          <Link to="/register"> My Account</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;
