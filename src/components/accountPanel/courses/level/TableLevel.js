import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import Table from "../../../../utils/Table";

const TableLevel = memo(({ levelList, refetch, setLevelList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const deleteLevel = async (id) => {
    await axios
      .delete(`http://127.0.0.1:8000/api/v1/level/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        setLevelList(null);
        refetch();
      })
      .catch((error) => console.log("error: ", error));
  };
  const headerList = ["Level Name", "Cycle", "Action"];
  const renderLevelHeader = useCallback(() => {
    return (
      <div>
        <p className="text-primary-green text-3xl my-5">Class List</p>
        <div className="grid grid-cols-3 text-center font-bold italic my-2">
          {headerList.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    );
  }, [headerList]);
  const renderLevelRow = useCallback((item) => {
    return (
      <div className="grid grid-cols-3 text-center p-1">
        <p>{item?.name}</p>
        <p>{item?.cycle?.name}</p>

        <div className="flex gap-3 text-xl justify-center">
          <button
            onClick={() => {
              navigate(`edit_level/${item?.id}`, {
                state: {
                  cycle_id: item?.cycle?.id,
                  previousURL: location?.pathname,
                },
              });
              // queryClient.invalidateQueries(["level-info"]);
            }}
          >
            <BiShow className="text-primary-green" />
          </button>
          <button onClick={() => deleteLevel(item.id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      </div>
    );
  }, []);
  return (
    <Table
      dataList={levelList}
      renderRow={renderLevelRow}
      renderHeader={renderLevelHeader}
    />
  );
});

export default TableLevel;
