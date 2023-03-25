import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Table from "../../../../utils/Table";

const TableStudentAttendance = memo(
  ({ studentAtendanceList, refetch, setStudentAtendanceList }) => {
    const navigate = useNavigate();
    const location = useLocation();
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
          <p className="text-primary-green text-3xl my-5">Class List</p>
          <div className="grid grid-cols-6 text-center font-bold italic my-2">
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
          <p>{item?.date}</p>
          <p>{item?.cycle}</p>
          <p>{item?.level}</p>
          <p>{item?.subject}</p>
          <p>{item?.teacher}</p>

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
            <button
            // onClick={() => deleteLevel(item.id)}
            >
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
