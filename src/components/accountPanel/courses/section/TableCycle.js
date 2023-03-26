import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Table from "../../../../utils/Table";

const TableCycle = memo(({ cycleList, refetch, setCycleList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteCycle = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/v1/cycle/${id}/`)
      .then((response) => {
        setCycleList(null);
        refetch();
      })
      .catch((error) => console.log("error: ", error));
  };
  const headerList = ["Cycle Name", "Action"];
  const renderCycleHeader = useCallback(() => {
    return (
      <div>
        <p className="text-primary-green text-3xl my-5">Cycle List</p>
        <div className="grid grid-cols-2 text-center font-bold italic my-2">
          {headerList.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    );
  }, [headerList]);
  const renderCycleRow = useCallback((item) => {
    return (
      <div className="grid grid-cols-2 text-center p-1">
        <p>{item.name}</p>

        <div className="flex gap-3 text-xl justify-center">
          <button
            onClick={() => {
              navigate(`edit_cycle/${item.id}`, {
                state: {
                  previousURL: location.pathname,
                },
              });
            }}
          >
            <BiShow className="text-primary-green" />
          </button>
          <button onClick={() => deleteCycle(item.id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      </div>
    );
  }, []);
  return (
    <Table
      dataList={cycleList}
      renderRow={renderCycleRow}
      renderHeader={renderCycleHeader}
    />
  );
});

export default TableCycle;
