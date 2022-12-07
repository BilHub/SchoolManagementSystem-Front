import React, { useEffect } from "react";
import AttendancePart from "../commun/AttendancePart";
import { AiFillDelete } from "react-icons/ai";
import SelectCourses from "../../courses/commun/SelectCourses";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  getStudentsAttendanceRedux,
  resetStudentsListRedux,
  updateStudentsAttendanceRedux,
} from "../../../../redux/attendanceSlice";
import axios from "axios";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import { useLocation, useNavigate } from "react-router-dom";

const AddAttendanceStudents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedCycleId, selectedLevelId, selectedClassId, date } =
    useSelector((state) => state.courses);
  const { studentsAttendance } = useSelector((state) => state.attendance);

  const handleSelectStatus = (e, item) => {
    const i = studentsAttendance.find((element) => element.id == item.id);
    const updatedItem = { ...i, status: e.target.value };
    const newList = studentsAttendance.filter(
      (element) => element.id !== item.id
    );
    const lastList = [...newList, updatedItem];
    const lastListSorted = lastList.sort((a, b) => a.id - b.id);
    dispatch(updateStudentsAttendanceRedux(lastListSorted));
  };

  const attendanceItems = studentsAttendance.map((item) => {
    return {
      student: item.id,
      status: item.status,
      comment: item.comment,
    };
  });
  const payload = {
    subject: selectedClassId,
    cycle: selectedCycleId,
    level: selectedLevelId,
    date: date,
    attendance_items: attendanceItems,
  };
  console.log("payload is: ", payload);
  const createAttendance = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/attendance/", payload)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (selectedClassId) {
      dispatch(getStudentsAttendanceRedux(selectedClassId));
    } else {
      dispatch(resetStudentsListRedux());
    }
  }, [selectedCycleId, selectedLevelId, selectedClassId]);

  return (
    <div className="ml-52 mt-22 mr-10">
      <AttendancePart />
      <SelectCourses />
      <div className="flex flex-col my-5 gap-3">
        <div className="flex justify-around">
          <select className="">
            <option>Teacher1</option>
            <option>Teacher2</option>
          </select>
          {/* <input type="date" name="date" /> */}
          <DateSelectCourses />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-primary-green text-3xl ">Student's Attendance</p>
          <button
            className="flex gap-5 items-center text-primary-yellow font-semibold"
            onClick={() =>
              navigate(`${user.subdomain}/admin_panel/students/add_student`, {
                state: { message: "Failed to submit form" },
              })
            }
            // onClick={() =>
            //   navigate("/login", {
            //     state: { message: "Failed to submit form" },
            //   })
            // }
          >
            <p>Add Student</p>
            <BsFillPlusCircleFill className="text-3xl" />
          </button>
        </div>

        <div className="grid grid-cols-7 my-3 gap-3 font-semibold">
          <p className="grid col-span-2">Student</p>
          <p>Status</p>
          <p className="grid col-span-3">Comment</p>
          <p className="m-auto">Action</p>
        </div>
        <ul>
          {studentsAttendance?.map((item, index) => {
            return (
              <li className="grid grid-cols-7 gap-3 items-center odd:bg-gray-200 m-1">
                <p className="grid col-span-2">
                  {item.last_name} {item.first_name}
                </p>
                <select
                  className="w-[100px] bg-gray-200 p-1"
                  defaultValue={item.status}
                  value={item.status}
                  onChange={(e) => handleSelectStatus(e, item)}
                  name="status"
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
            onClick={createAttendance}
          >
            Create Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttendanceStudents;
