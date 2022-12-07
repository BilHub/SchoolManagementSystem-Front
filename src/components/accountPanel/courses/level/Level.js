import React from "react";
import { CoursesPart } from "../commun/CoursesPart";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { LevelListData } from "../../../../data/AdminPanel/LevelListData";

const Level = () => {
  return (
    <div className="ml-52 mt-22 mr-16">
      <CoursesPart />
      <div className=" flex justify-around items-center my-10 ">
        <button className="rounded-md text-white bg-primary-yellow p-2 font-semibold">
          Add a Level
        </button>
        <div>
          <label>Section: </label>
          <select className="p-1 bg-gray-100">
            <option>section1</option>
            <option>section1</option>
            <option>section1</option>
          </select>
        </div>
        <div className="flex gap-3 items-center">
          <label>level: </label>
          <input
            type="text"
            placeholder="Enter the class name ..."
            className="border border-gray-200 p-1 focus:outline-none"
          />
        </div>
      </div>
      <div className="max-w-[650px]">
        <p className="text-primary-green text-3xl m-5">Levels List</p>
        <div className="grid grid-cols-3 text-center font-bold italic my-2">
          <p>Level</p>
          <p>Section</p>
          <p>Action</p>
        </div>
        <ul className="">
          {LevelListData.map((item, index) => {
            return (
              <li
                key={index}
                className="grid grid-cols-3 text-center p-1 odd:bg-gray-200"
              >
                <p>{item.level}</p>
                <p>{item.section}</p>
                <div className="flex gap-3 text-xl justify-center">
                  <button>
                    <AiFillEdit className="text-primary-yellow" />
                  </button>
                  <button>
                    <AiFillDelete className="text-red-500" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Level;
