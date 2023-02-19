import React, { useEffect, useState } from "react";
import { CoursesPart } from "../commun/CoursesPart";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import AddClass from "./AddClass";

const Class = () => {
  const [classList, setClassList] = useState([]);

  const addNewClass = (newClass) => {
    setClassList((currentClasses) => {
      return [...currentClasses, newClass];
    });
  };

  const getClassList = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/v1/subject/", {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setClassList(response.data);
      })
      .catch((error) => console.log(error));
  };

  console.log("render");

  useEffect(() => {
    getClassList();
  }, []);

  return (
    <div className="ml-52 mt-22 mr-16">
      <CoursesPart />
      <AddClass addNewClass={addNewClass} />
      <div>
        <p className="text-primary-green text-3xl my-5">Class List</p>
        <div className="grid grid-cols-6 text-center font-bold italic my-2">
          <p>Class Name</p>
          <p>Cycle</p>
          <p>Level</p>
          <p>Teacher</p>
          <p>Number of students</p>
          <p>Action</p>
        </div>
        <ul>
          {classList.map((item, index) => {
            return (
              <li
                key={item.id}
                className="grid grid-cols-6 text-center p-1 odd:bg-gray-200"
              >
                <p>{item.subject_name}</p>
                <p>{item.cycle.name}</p>
                <p>{item.level.name}</p>
                <p>
                  {item.teachers_list.map((teacher, index) => (
                    <p>{teacher}</p>
                  ))}
                </p>
                <p>{item.students_number}</p>
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

export default Class;
