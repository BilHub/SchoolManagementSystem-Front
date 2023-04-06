import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Navigate } from "react-big-calendar";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ModaleEvent = ({
  showModal,
  closeModal,
  selectedEvent,
  refetchEventsList,
}) => {
  const navigate = useNavigate();
  const handleCloseModal = (e) => {
    if (e.target.id == "schedule") closeModal();
  };

  const deleteEventMutation = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: (data, variables, context) => {
      refetchEventsList();
      closeModal();
    },
  });

  const deleteEvent = (id) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return axios.delete(`http://127.0.0.1:8000/api/v1/schedule/${id}`, {
      headers: {
        "Content-type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    });
  };

  const deleteFunc = () => {
    deleteEventMutation.mutate(selectedEvent.id);
  };

  if (!showModal) return null;
  return (
    <div
      className="fixed top-0 h-[200px] w-[500px] text-white bg-black bg-opacity-80 backdrop-blur-sm flex flex-col justify-center items-center z-10 gap-3 text-xl"
      id="modal-container"
      onClick={handleCloseModal}
    >
      <AiFillCloseCircle
        className="absolute top-0 right-0 mt-2 mr-2 w-7 h-7 hover:cursor-pointer"
        onClick={closeModal}
      />
      <p className="text-primary-yellow text-2xl font-semibold uppercase">
        Edit / Delete this event
      </p>
      <p>{selectedEvent.title}</p>
      <div className="flex gap-3">
        <p>
          {selectedEvent["start"].toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
        <span>To</span>
        <p>
          {selectedEvent["end"].toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
        </p>
      </div>
      {/* <p>{selectedEvent.end}</p> */}

      <div className="flex gap-10">
        <button
          className="bg-primary-green rounded rounded-md  p-1"
          onClick={() => navigate(`edit_event/${selectedEvent.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 rounded rounded-md  p-1"
          onClick={deleteFunc}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModaleEvent;
