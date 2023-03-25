import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Table from "../../../utils/Table";
import useDeletePayement from "../../../hooks/useDeletePayement";

const TableDetailFinance = ({ paymentsList, openModal, refetch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate } = useDeletePayement();
  const headerList = ["Date", "Amount", "Comment", "Action"];

  const handleDeletePayement = (id) => {
    mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const renderPayementHeader = useCallback(() => {
    return (
      <div>
        <div className="flex justify-between items-center">
          <p className="text-primary-green text-3xl my-5">Payements</p>
          <button
            className="flex gap-3 items-center text-primary-yellow font-semibold"
            onClick={openModal}
          >
            <p className="text-xl">New</p>
            <BsFillPlusCircleFill className="text-4xl" />
          </button>
        </div>
        <div className="grid grid-cols-4 text-center font-bold italic my-2">
          {headerList.map((item, index) => {
            return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    );
  }, [headerList]);

  const renderPayementRow = useCallback((item) => {
    return (
      <div className="grid grid-cols-4 text-center p-1 items-center  hover:text-primary-green">
        <p>{item.date_of_payement}</p>
        <p>{item.amount}</p>
        <p>{item.comment}</p>

        <div className="flex gap-3 text-xl justify-center ">
          <button
            onClick={() =>
              navigate(`edit?payement=${item.id}`, {
                state: window.location.pathname,
              })
            }
          >
            <BiShow className="text-primary-green hover:cursor-pointer" />
          </button>
          <button onClick={() => handleDeletePayement(item.id)}>
            <AiFillDelete className="text-red-500 hover:cursor-pointer" />
          </button>
        </div>
      </div>
    );
  }, []);
  return (
    <Table
      dataList={paymentsList}
      renderRow={renderPayementRow}
      renderHeader={renderPayementHeader}
    />
  );
};

export default TableDetailFinance;
