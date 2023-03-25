import React, { useEffect, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import ModalAddStudent from "./ModalAddStudent";
import StudentTeacherSelect from "../../sharedComponents/StudentTeacherSelect";
import FilterClassAttendance from "./FilterClassAttendance";

const AddAttendanceStudents = () => {
  const [showModal, setShowModal] = useState(false);
  const [studentsLevelList, setStudentsLevelList] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedCycleId, selectedLevelId, selectedClassId, date } =
    useSelector((state) => state.courses);
  const { studentsAttendance } = useSelector((state) => state.attendance);

  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const handleSelectStatus = (e, item) => {
    const updatedList = studentsAttendance.map((element) => {
      if (element.id == item.id) {
        return {
          ...element,
          status: e.target.value,
        };
      } else return element;
    });
    dispatch(updateStudentsAttendanceRedux(updatedList));
  };

  const handleComment = (e, item) => {
    const updatedList = studentsAttendance.map((element) => {
      if (element.id == item.id) {
        return {
          ...element,
          comment: e.target.value,
        };
      } else return element;
    });
    dispatch(updateStudentsAttendanceRedux(updatedList));
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
  const createAttendance = async () => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/attendance/", payload)
      .then((response) =>
        navigate(`${user.subdomain}/admin_panel/attendance/students`)
      )
      .catch((error) => console.log(error));
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const getStudentsList = async () => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_level/?level_id=${selectedLevelId}`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "JWT " + token,
          },
        }
      )
      .then((response) => {
        const dataList = response.data.map((item) => {
          const new_item = {
            id: item.id,
            value: item.first_name + " " + item.last_name,
            label: item.first_name + " " + item.last_name,
          };
          return new_item;
        });
        setStudentsLevelList(dataList);
      })
      .catch((error) => console.log(error));
  };

  const deleteStudentAttendance = async (student_id) => {
    await axios.delete(
      `http://127.0.0.1:8000/api/v1/students/subject/${student_id}/?subject_id=${selectedClassId}`,
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      }
    );
    dispatch(getStudentsAttendanceRedux(selectedClassId));
  };

  useEffect(() => {
    getStudentsList();
    if (selectedClassId) {
      dispatch(getStudentsAttendanceRedux(selectedClassId));
    } else {
      dispatch(resetStudentsListRedux());
    }
  }, [selectedCycleId, selectedLevelId, selectedClassId]);

  return (
    <div className="ml-52 mt-22 mr-10">
      <ModalAddStudent
        closeModal={closeModal}
        visible={showModal}
        list={studentsLevelList}
        subject_id={selectedClassId}
        subdomain={user.subdomain}
      />
      <StudentTeacherSelect />
      <div className="flex gap-10 justify-center items-center">
        <FilterClassAttendance />
        <div className="flex flex-col my-5 gap-3">
          <div className="flex gap-1">
            <span className="text-primary-green font-semibold">Teacher:</span>
            <select>
              <option>Teacher1</option>
              <option>Teacher2</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <p className="text-primary-green text-3xl ">Student's Attendance</p>
          <button
            className="flex gap-5 items-center text-primary-yellow font-semibold"
            onClick={() => setShowModal(true)}
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
              <li
                key={item.id}
                className="grid grid-cols-7 gap-3 items-center odd:bg-gray-200 m-1"
              >
                <p className="grid col-span-2">
                  {item.last_name} {item.first_name}
                </p>
                <select
                  className="w-[100px] bg-gray-200 p-1"
                  defaultValue={item.status}
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
                  onChange={(e) => handleComment(e, item)}
                  className="grid col-span-3 p-1 truncate odd:bg-gray-200"
                />
                <div className="flex text-xl justify-center items-center">
                  <button
                    onClick={() => {
                      const student_id = item.id.toString();
                      deleteStudentAttendance(student_id);
                    }}
                  >
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
