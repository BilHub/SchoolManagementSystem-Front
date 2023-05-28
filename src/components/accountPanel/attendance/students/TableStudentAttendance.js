import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  setDateRedux,
  setSelectedClassIdRedux,
} from "../../../../redux/courseSlice";

import Table from "../../../../utils/Table";
import { useDispatch } from "react-redux";
import {
  getAllStudentsAttendanceRedux,
  getStudentsAttendanceRedux,
} from "../../../../redux/attendanceSlice";
import attendanceService from "../../../../services/attendanceService";
import { api } from "../../../../utils/backend.instance";

const deleteAttendance = async (id) => {
  await api.delete(`api/v1/attendance/${id}/`);
  // .then((response) => window.location.reload());
};

const TableStudentAttendance = memo(
  ({ studentAtendanceList, refetch, setStudentAtendanceList }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const headerList = [
      "Date",
      "Cycle",
      "Level",
      "Subject",
      "Teacher",
      "Action",
    ];

    const renderStudentAtendanceHeader = useCallback(() => {
      return (
        <div>
          <div className="flex items-center justify-between mr-20">
            <p className="text-primary-green text-3xl my-5">Attendance List</p>
            <BsFillPlusCircleFill
              className="text-4xl text-primary-yellow cursor-pointer
             hover:text-primary-green"
              onClick={() => {
                dispatch(setDateRedux(""));
                navigate("add_attendance", {
                  state: location.pathname,
                });
              }}
            />
          </div>
          <div className="hidden md:grid grid-cols-6 text-center font-bold italic my-2">
            {headerList.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
      );
    }, [headerList]);

    const renderStudentAtendanceRow = useCallback((item) => {
      return (
        <div className="grid grid-cols-6 text-center p-1">
          <p className="col-span-2 md:col-span-1">{item?.date}</p>
          <p className="hidden md:inline-block">{item?.cycle}</p>
          <p className="hidden md:inline-block">{item?.level}</p>
          <p className="col-span-3 md:col-span-1">{item?.subject}</p>
          <p className="hidden md:inline-block">{item?.teacher}</p>

          <div className="flex gap-3 text-xl justify-center">
            <button
              onClick={() => {
                navigate(`edit_attendance/${item?.id}`, {
                  state: location.pathname,
                });
              }}
            >
              <BiShow className="text-primary-green" />
            </button>
            <button onClick={() => deleteAttendance(item.id)}>
              <AiFillDelete className="text-red-500" />
            </button>
          </div>
        </div>
      );
    }, []);
    return (
      <Table
        dataList={studentAtendanceList}
        renderRow={renderStudentAtendanceRow}
        renderHeader={renderStudentAtendanceHeader}
      />
    );
  }
);

export default TableStudentAttendance;
