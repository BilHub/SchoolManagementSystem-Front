import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { api } from "../../../utils/backend.instance";

const FinanceStudentEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const params = useParams();
  const payement_id = searchParams.get("payement");
  const token = JSON.parse(localStorage.getItem("token"));
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [payementInfo, setPayementInfo] = useState("");
  const body = {
    date_of_payement: date ? date : payementInfo.date_of_payement,
    amount: amount ? amount : payementInfo.amount,
    comment: comment ? comment : payementInfo.comment,
    student_id: params.id,
  };
  const getPayementInfo = async () => {
    await api
      .get(`api/v1/finance/student_payement/${payement_id}/`)
      .then((response) => {
        setPayementInfo(response.data);
      })
      .catch((error) => console.log("error from function: ", error));
  };
  useEffect(() => {
    getPayementInfo();
  }, []);
  const editPayement = async (e) => {
    e.preventDefault();
    await api
      .put(`api/v1/finance/student_payement/${payement_id}/`, body, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => console.log("response: ", response.data))
      .catch((error) => console.log("error: ", error));
    navigate(location.state);
  };
  return (
    <>
      <div
        className=" ml-44 mt-5 flex items-center gap-3 text-primary-green font-bold cursor-pointer hover:text-primary-yellow"
        onClick={() => navigate(location?.state)}
      >
        <BsArrowLeft className="text-3xl " />
        <p className="flex mt-auto text-2xl italic">Back</p>
      </div>
      <form
        onSubmit={editPayement}
        className="h-screen w-full bg-white flex flex-col items-center gap-5 text-xl ml-24 mt-10"
      >
        <p className="text-primary-green text-3xl font-semibold">
          Edit Payement
        </p>
        <div className="flex flex-col items-center justify-center">
          <p>student name:</p>
          <p className="italic font-semibold">
            {payementInfo && payementInfo.student["first_name"] + " "}
            {payementInfo && payementInfo.student["last_name"]}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label>Date:</label>
          <input
            type="date"
            className="bg-gray-200"
            value={date ? date : payementInfo.date_of_payement}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label>Amount:</label>
          <input
            type="text"
            className="bg-gray-200 w-[200px]"
            value={amount ? amount : payementInfo.amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label>Comment:</label>
          <textarea
            className="bg-gray-200"
            value={comment ? comment : payementInfo.comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-10">
          <button
            type="submit"
            className="bg-primary-green rounded rounded-md text-white p-1"
          >
            Modify
          </button>
          <button
            className="bg-red-500 rounded rounded-md text-white p-1"
            //   onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default FinanceStudentEdit;
