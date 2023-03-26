import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useAddPayement from "./useAddPayement";

const ModalAddPayement = ({ showModal, closeModal, refetch }) => {
  const location = useLocation();
  const student_id = location.pathname.charAt(location.pathname.length - 1);
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const { mutate } = useAddPayement();

  const handleAddPayement = () => {
    const payload = {
      date_of_payement: date,
      amount: amount,
      comment: comment,
      student_id: student_id,
    };
    mutate(payload, {
      onSuccess: () => {
        refetch();
      },
    });
    closeModal();
  };

  const handleCloseModal = (e) => {
    if (e.target.id == "modal-container") closeModal();
  };

  if (!showModal) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
      id="modal-container"
      onClick={handleCloseModal}
    >
      <div className="h-[400px] w-[400px] bg-white flex flex-col justify-center items-center gap-5 text-xl">
        <p className="text-primary-green text-3xl font-semibold">
          New Payement
        </p>
        <div className="flex flex-col items-center justify-center">
          <label>Date:</label>
          <input
            type="date"
            className="bg-gray-200"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label>Amount:</label>
          <input
            type="text"
            className="bg-gray-200 w-[200px]"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <label>Comment:</label>
          <textarea
            className="bg-gray-200"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-10">
          <button
            className="bg-primary-green rounded rounded-md text-white p-1"
            onClick={handleAddPayement}
          >
            Add
          </button>
          <button
            className="bg-red-500 rounded rounded-md text-white p-1"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddPayement;
