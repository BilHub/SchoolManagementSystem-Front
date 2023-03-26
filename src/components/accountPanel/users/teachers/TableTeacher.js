import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../../utils/Table";
import teachersService from "../../../../services/teachersService";

const TableTeacher = ({ teachersList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const renderTeacherRow = (value) => {
    return (
      <div
        className="grid grid-cols-4 place-items-center
             text-center"
      >
        <p>
          {value.first_name} {value.last_name}
        </p>
        <p>{value.email}</p>
        <p>{value.phone}</p>
        <div className="flex gap-3 text-xl">
          <button
            onClick={() =>
              navigate(`edit_teacher/${value.id}`, {
                state: location.pathname,
              })
            }
          >
            <BiShow className="text-primary-green" />
          </button>
          <button onClick={() => teachersService.deleteTeacher(value.id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div
        className="hidden md:grid grid-cols-4 my-2 place-items-center 
font-semibold italic "
      >
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Action</p>
      </div>
    );
  };
  return (
    <Table
      dataList={teachersList}
      renderRow={renderTeacherRow}
      renderHeader={renderHeader}
    />
  );
};

export default TableTeacher;
