import React from "react";
import { BsTwitter } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { MdFacebook } from "react-icons/md";

const TopBar = () => {
  return (
    <div className="sticky top-0 md:flex md:justify-between items-center bg-primary-green p-1 md:px-5 text-white z-20">
      <div className="flex flex-col md:flex-row justify-center items-center md:gap-3 text-xs">
        <p>Email : school@info.com</p>
        <p>Phone : 00213 5 55 55 55</p>
      </div>
      <div className="flex justify-center items-center gap-1 text-2xl">
        <MdFacebook />
        <BsTwitter />
        <AiFillInstagram />
      </div>
      <div className="text-center">Langue: fr</div>
    </div>
  );
};

export default TopBar;
