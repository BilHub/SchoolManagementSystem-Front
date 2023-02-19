import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import EditDailyAttendance from "./EditDailyAttendance";
import { useQuery } from "@tanstack/react-query";
import attendanceService from "../../../../services/attendanceService";

const EditStudentAttendance = () => {
  const location = useLocation();
  const attendance_id = location.pathname.charAt(location.pathname.length - 1);
  const [date, setDate] = useState("");
  // const [teacher, setTeacher] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState({
    label: "",
    value: "",
  });
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [changedStudentsAttendance, setChangedStudentsAttendance] = useState(
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
        setChangedStudentsAttendance(response.data);
      })
      .catch((error) => console.log(error));
  };

  const { data: attendanceData = {} } = useQuery(
    ["daily-attendance", attendance_id],
    () => attendanceService.getStudentsDailyAttendance(attendance_id),
    {
      onSuccess: (attendanceData) => {
        setCurrentTeacher({
          label: attendanceData.teacher,
          value: attendanceData.id,
        });
        setDate(attendanceData.date);
      },
    }
  );

  const handleUpdateStudentsAttendance = () => {
    const listToUpdate = changedStudentsAttendance.filter(
      (element) =>
        studentsAttendance.find((item) => item.id == element.id).status !=
          element.status ||
        studentsAttendance.find((item) => item.id == element.id).comment !=
          element.comment
    );

    listToUpdate.map((item) => {
      axios
        .put(
          `http://127.0.0.1:8000/api/v1/student_attendance/${item.id}/`,
          { status: item.status, comment: item.comment },
          {
            headers: {
              "Content-type": "application/json",
              accept: "application/json",
            },
          }
        )
        .catch((error) => console.log(error));
    });


    let dataToUpdate = {};
    if (date != attendanceData.date) {
      dataToUpdate = { date: date };
    }
    if (currentTeacher.label != attendanceData.teacher) {
      dataToUpdate = { ...dataToUpdate, teacher: currentTeacher.id };
    }
    console.log("dataToUpdate: ", dataToUpdate);
    axios
      .put(
        `http://127.0.0.1:8000/api/v1/attendance/${attendance_id}/`,
        dataToUpdate,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
        }
      )
      .catch((error) => console.log(error));
  };

  const handleChangeStatus = (e, item) => {
    const newList1 = changedStudentsAttendance.map((element) => {
      if (element.id == item.id) {
        return { ...element, status: e.target.value };
      } else return element;
    });
    setChangedStudentsAttendance(newList1);
  };
  const handleChangeComment = (e, item) => {
    const newList2 = changedStudentsAttendance.map((element) => {
      if (element.id == item.id) {
        return { ...element, comment: e.target.value };
      } else return element;
    });
    setChangedStudentsAttendance(newList2);
  };

  useEffect(() => {
    getStudentsAttendance(attendance_id);
  }, []);



  return (
    <div>
      <EditDailyAttendance
        currentTeacher={currentTeacher}
        setCurrentTeacher={setCurrentTeacher}
        date={date}
        setDate={setDate}
      />
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
              <li
                key={index}
                className="grid grid-cols-7 gap-3 items-center odd:bg-gray-200 m-1"
              >
                <p className="grid col-span-2">
                  {item.last_name} {item.first_name}
                </p>
                <select
                  className="w-[100px] bg-gray-200 p-1"
                  defaultValue={item.status}
                  // value={item.status}
                  name="status"
                  onChange={(e) => handleChangeStatus(e, item)}
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
                  defaultValue={item.comment}
                  onChange={(e) => handleChangeComment(e, item)}
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
            onClick={handleUpdateStudentsAttendance}
          >
            update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentAttendance;
