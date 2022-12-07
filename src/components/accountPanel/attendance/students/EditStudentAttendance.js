import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const EditStudentAttendance = () => {
  const location = useLocation();
  const attendance_id = location.pathname.charAt(location.pathname.length - 1);
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [updatedStudentsAttendance, setUpdatedStudentsAttendance] = useState(
    []
  );
  const getStudentsAttendance = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/student_attendance?attendance=${id}`, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        setStudentsAttendance(response.data);
        setUpdatedStudentsAttendance(response.data);
      })
      .catch((error) => console.log(error));
  };

  const updateStudentsAttendance = () => {
    studentsAttendance.map((item) => {
      axios
        .put(`http://127.0.0.1:8000/api/v1/student_attendance/${item.id}`, {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
    });
  };

  // const handleSelectStatus = (id) => {
  //   const list = updatedStudentsAttendance.filter((item) => item.id !== id);
  //   // setUpdatedStudentsAttendance(list);
  //   console.log("list: ", list);
  // };

  useEffect(() => {
    getStudentsAttendance(attendance_id);
  }, []);

  console.log("updatedStudentsAttendance: ", updatedStudentsAttendance);

  return (
    <div className="ml-10 mr-10">
      <p className="text-primary-green text-3xl ">Student's Attendance</p>
      <div className="grid grid-cols-7 my-3 gap-3 font-semibold">
        <p className="grid col-span-2">Student</p>
        <p>Status</p>
        <p className="grid col-span-3">Comment</p>
        <p className="m-auto">Action</p>
      </div>
      <ul>
        {studentsAttendance.map((item, index) => {
          return (
            <li className="grid grid-cols-7 gap-3 items-center odd:bg-gray-200 m-1">
              <p className="grid col-span-2">
                {item.last_name} {item.first_name}
              </p>
              <select
                className="w-[100px] bg-gray-200 p-1"
                defaultValue={item.status}
                // value={item.status}
                name="status"
                // onChange={(e) =>
                //   setUpdatedStudentsAttendance((prev) => {
                //     return { ...prev, [item]: e.target.value };
                //   })
                // }
                // onChange={dispatch(handleSelectStatus(item.id))}
              >
                <option value="present">present</option>
                <option value="absent">absent</option>
                <option value="late">late</option>
              </select>
              <input
                type="text"
                placeholder="comment"
                className="grid col-span-3 p-1 truncate odd:bg-gray-200"
              />
              <div className="flex text-xl justify-center items-center">
                <button>
                  <AiFillDelete className="text-red-500" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-center m-5 ">
        <button
          className="rounded-lg bg-primary-green p-1 text-white font-semibold"
          onClick={updateStudentsAttendance}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default EditStudentAttendance;
