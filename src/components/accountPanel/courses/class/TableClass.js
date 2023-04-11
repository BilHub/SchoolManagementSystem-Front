import axios from "axios";
import React, { memo, useCallback, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../../utils/backend.instance";

import Table from "../../../../utils/Table";

const TableClass = memo(({ classList, refetch, setClassList }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  console.log("table class rendered");
  const deleteSubject = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    await api
      .delete(`http://127.0.0.1:8000/api/v1/subject/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        setClassList(null);
        refetch();
      })
      .catch((error) => console.log("error: ", error));
  };
  const headerList = [
    "Class Name",
    "Cycle",
    "Level",
    "Teacher",
    "Number of students",
    "Action",
  ];
  const renderClassHeader = useCallback(() => {
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
  const renderClassRow = useCallback((item) => {
    return (
      <div className="grid grid-cols-6 text-center p-1">
        <p>{item?.subject_name}</p>
        <p>{item?.cycle?.name}</p>
        <p>{item?.level?.name}</p>
        <p>
          {item?.teachers_list.map((teacher, index) => (
            <p>{teacher}</p>
          ))}
        </p>
        <p>{item?.students_number}</p>
        <div className="flex gap-3 text-xl justify-center">
          <button
            onClick={() => {
              navigate(`edit_subject/${item.id}`, {
                state: {
                  level_id: item.level.id,
                  cycle_id: item.cycle.id,
                  previousURL: location.pathname,
                },
              });
            }}
          >
            <BiShow className="text-primary-green" />
          </button>
          <button onClick={() => deleteSubject(item.id)}>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      </div>
    );
  }, []);
  return (
    <Table
      dataList={classList}
      renderRow={renderClassRow}
      renderHeader={renderClassHeader}
    />
  );
});

export default TableClass;
