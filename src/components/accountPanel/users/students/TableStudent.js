import React from "react";
import studentsService from "../../../../services/studentsService";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../../utils/Table";

const TableStudent = ({ studentsList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const renderStudentRow = (value) => {
    return (
      <div
        className="grid grid-cols-6 md:grid-cols-12 place-items-center
             text-center"
      >
        <p className="col-span-3">
          {value.first_name} {value.last_name}
        </p>
        <p className="hidden md:grid md:col-span-3 ">{value.email}</p>
        <p className="hidden md:grid md:col-span-2">{value.phone}</p>
        <p className="col-span-2">{value.level.name}</p>
        <p className="col-span-1 flex gap-3 text-xl">
          <button
            onClick={() =>
              navigate(`edit_student/${value.id}`, {
                state: location.pathname,
              })
            }
          >
            <BiShow className="text-primary-green" />
          </button>
          <button onClick={() => studentsService.deleteStudent(value.id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </p>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div
        className="hidden md:grid grid-cols-12 my-2 place-items-center 
font-semibold italic "
      >
        <p className="col-span-3">Name</p>
        <p className="col-span-3">Email</p>
        <p className="col-span-2">Phone</p>
        <p className="col-span-2">Level</p>
        <p className="col-span-2">Action</p>
      </div>
    );
  };
  return (
    <Table
      dataList={studentsList}
      renderRow={renderStudentRow}
      renderHeader={renderHeader}
    />
  );
};

export default TableStudent;
