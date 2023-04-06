import React, { memo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Table from "../../../utils/Table";

const TableFinance = ({ studentsList }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const headerList = ["Student Name", "Cycle", "Level", "Last payement"];
  const renderStudentHeader = useCallback(() => {
    return (
      <div>
        <p className="text-primary-green text-3xl my-5">Students</p>
        <div className="grid grid-cols-4 text-center font-bold italic my-2">
          {headerList.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    );
  }, [headerList]);

  const renderStudentRow = useCallback((item) => {
    return (
      <div
        className="grid grid-cols-4 text-center p-1 items-center hover:cursor-pointer hover:text-primary-green"
        onClick={() =>
          navigate(`${location.pathname}/${item.id}`, {
            state: location.pathname,
          })
        }
      >
        <p>
          {item.first_name} {item.last_name}
        </p>
        <p>{item.cycle.name}</p>
        <p>{item.level.name}</p>
        <p>{item.last_payement}</p>
      </div>
    );
  }, []);
  return (
    <Table
      dataList={studentsList}
      renderRow={renderStudentRow}
      renderHeader={renderStudentHeader}
    />
  );
};

export default memo(TableFinance);
