import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import authHeader from "../../../services/authHeader";
import SelectCourses from "../courses/commun/SelectCourses";
import StudentTeacherSelect from "../sharedComponents/StudentTeacherSelect";

const FinanceStudents = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );

  const fetchStudentsList = (id1, id2, id3) => {
    return axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => response.data);
  };

  const { data: studentsList = [] } = useQuery(
    ["studentsListQuery", selectedCycleId, selectedLevelId, selectedClassId],
    () => fetchStudentsList(selectedCycleId, selectedLevelId, selectedClassId)
  );

  // const studentsList = [];
  return (
    <>
      <StudentTeacherSelect />
      <SelectCourses />
      <div className="ml-3 md:ml-52">
        <div className="flex items-center justify-between mr-20">
          <p className="text-3xl py-3 text-primary-green ">
            Students Payements
          </p>
        </div>
      </div>
      <div className="md:overflow-x-auto mr-3 md:mr-20">
        <div className="md:min-w-[800px]">
          <div
            className="hidden md:grid grid-cols-12 my-2 place-items-center 
            font-semibold italic "
          >
            <p>ID</p>
            <p className="col-span-2">Name</p>
            <p className="col-span-2">Class Level</p>
            <p className="col-span-2">Phone</p>
            <p className="col-span-2">Status</p>
            <p className="col-span-2">Action</p>
          </div>
          <ul>
            {studentsList?.map((value, index) => {
              return (
                <li className="odd:bg-gray-200 p-2 hover:cursor-pointer hover:text-primary-green" key={value.id}
                onClick = {()=> navigate(`${location.pathname}/${value.id}`)}
                >
                  <div
                    className="grid grid-cols-6 md:grid-cols-12 place-items-center
                     text-center"
                  >
                    <p className="hidden md:grid">{value.id}</p>
                    <p className="col-span-2">
                      {value.first_name} {value.last_name}
                    </p>
                    <p className="hidden md:grid md:col-span-3 ">
                      {value.email}
                    </p>
                    <p className="hidden md:grid md:col-span-2">
                      {value.phone}
                    </p>
                    <p className="col-span-2">{value.level}</p>
                    <p className="col-span-2 flex gap-3 text-xl">
                      <button>
                        {/* <BiShow className="text-primary-green" /> */}
                      </button>
                      <button>
                        {/* <AiFillEdit className="text-primary-yellow" /> */}
                      </button>
                      <button>
                        {/* <AiFillDelete className="text-red-500" /> */}
                      </button>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FinanceStudents;
