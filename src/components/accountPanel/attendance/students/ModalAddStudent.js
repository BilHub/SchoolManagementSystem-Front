import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getStudentsAttendanceRedux } from "../../../../redux/attendanceSlice";

const ModalAddStudent = ({
  visible,
  closeModal,
  list,
  subject_id,
  subdomain,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCloseModal = (e) => {
    if (e.target.id == "modal-container") closeModal();
  };
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));

  const handleSelect = (selected) => {
    setSelectedStudentId(selected.id);
  };

  const addSubjectToStudent = async () => {
    await axios.patch(
      `http://127.0.0.1:8000/api/v1/students/subject/${selectedStudentId}/`,

      { subject_id: subject_id },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      }
    );
    closeModal();
    dispatch(getStudentsAttendanceRedux(subject_id));
  };

  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
      id="modal-container"
      onClick={handleCloseModal}
    >
      <div className="flex flex-col w-[350px] h-[350px] bg-white justify-around p-2 text-xl">
        <div className="flex flex-col gap-10 items-center">
          <button
            className="bg-primary-yellow rounded rounded-md p-1 text-white"
            onClick={() =>
              navigate(`${subdomain}/admin_panel/users/students/add_student`, {
                state: [window.location.pathname],
              })
            }
          >
            Add new student
          </button>
          <div className=" flex flex-col items-center">
            <span>Select a student:</span>
            <Select
              options={list}
              className="w-[250px]"
              onChange={handleSelect}
            />
          </div>
        </div>
        <div className="flex justify-around bg-white">
          <button
            className="bg-red-500 rounded rounded-md text-white p-1"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-primary-green rounded rounded-md text-white p-1"
            onClick={addSubjectToStudent}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAddStudent;
