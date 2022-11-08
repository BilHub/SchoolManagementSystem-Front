import React from "react";
import { CoursesPart } from "../commun/CoursesPart";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { SectionListData } from "../../../../data/AdminPanel/CoursesData";

const Section = () => {
  return (
    <div className="ml-52 mt-22 mr-16">
      <CoursesPart />
      <div className=" flex items-center my-10 justify-center gap-10">
        <button className="rounded-md text-white bg-primary-yellow p-2 font-semibold">
          Add a Section
        </button>

        <div className="flex gap-3 items-center">
          <label>Section: </label>
          <input
            type="text"
            placeholder="Enter the section name ..."
            className="border border-gray-200 p-1 focus:outline-none"
          />
        </div>
      </div>
      <div className="max-w-[500px]">
        <p className="text-primary-green text-3xl my-5">Sections List</p>
        <div className="grid grid-cols-2 text-center font-bold italic my-2">
          <p>Section</p>
          <p>Action</p>
        </div>
        <ul className="">
          {SectionListData.map((item, index) => {
            return (
              <li
                key={index}
                className="grid grid-cols-2 text-center p-1 odd:bg-gray-200"
              >
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

export default Section;
