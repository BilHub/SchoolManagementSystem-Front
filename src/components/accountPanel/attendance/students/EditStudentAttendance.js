import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import EditDailyAttendance from "./EditDailyAttendance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Table from "../../../../utils/Table";
import attendanceService from "../../../../services/attendanceService";

const EditStudentAttendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let attendance_id = location.pathname.charAt(location.pathname.length - 1);
  const [date, setDate] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState({
    label: "",
    value: "",
  });
  const queryClient = useQueryClient();

  const getStudentsAttendance = async () => {
    return await axios
      .get(
        `http://127.0.0.1:8000/api/v1/student_attendance?attendance=${attendance_id}`,
        {
          headers: {
            "Content-type": "application/json",
            accept: "application/json",
          },
        }
      )
      .then((response) => {
        // attendance_id = null;
        return response.data;
      })
      .catch((error) => console.log(error));
  };

  const {
    data: queryStudentAttendance = [],
    refetch,
    isLoading,
  } = useQuery(
    ["student-attendance"],
    getStudentsAttendance
    // , {
    //   enable: attendance_id != null,
    // }
  );

  console.log("queryStudentAttendance: ", queryStudentAttendance);

  const [studentsAttendance, setStudentsAttendance] = useState(
    queryStudentAttendance
  );

  useEffect(() => {
    // queryClient.invalidateQueries("student-attendance");
    refetch();
  }, []);

  let changedStudentsAttendance = queryStudentAttendance;

  const handleChangeStatus = (e, item) => {
    let newList1 = changedStudentsAttendance.map((element) => {
      if (element.id == item.id) {
        return { ...element, status: e.target.value };
      } else return element;
    });
    changedStudentsAttendance = newList1;
  };
  const handleChangeComment = (e, item) => {
    const newList2 = changedStudentsAttendance.map((element) => {
      if (element.id == item.id) {
        return { ...element, comment: e.target.value };
      } else return element;
    });
    changedStudentsAttendance = newList2;
  };

  // const { data: attendanceData = [], refetch: refetchAttendanceData } =
  //   useQuery(
  //     ["daily-attendance", attendance_id],
  //     () => attendanceService.getStudentsDailyAttendance(attendance_id),
  //     {
  //       onSuccess: (attendanceData) => {
  //         setCurrentTeacher({
  //           label: attendanceData.teacher,
  //           value: attendanceData.id,
  //         });
  //         setDate(attendanceData.date);
  //       },
  //     }
  //   );

  const handleUpdateStudentsAttendance = () => {
    const listToUpdate = changedStudentsAttendance?.filter(
      (element) =>
        queryStudentAttendance.find((item) => item.id == element.id).status !=
          element.status ||
        queryStudentAttendance.find((item) => item.id == element.id).comment !=
          element.comment
    );

    const requests = listToUpdate.map((item) => {
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
        .then((response) => refetch())
        .catch((error) => console.log(error));
    });

    navigate(location.state);

    // refetch();

    // await Promise.all(requests);

    // let dataToUpdate = {};
    // if (date != attendanceData.date) {
    //   dataToUpdate = { date: date };
    // }
    // if (currentTeacher.label != attendanceData.teacher) {
    //   dataToUpdate = { ...dataToUpdate, teacher: currentTeacher.id };
    // }
    // await axios
    //   .put(
    //     `http://127.0.0.1:8000/api/v1/attendance/${attendance_id}/`,
    //     dataToUpdate,
    //     {
    //       headers: {
    //         "Content-type": "application/json",
    //         accept: "application/json",
    //       },
    //     }
    //   )
    //   .then(() => refetchAttendanceData())
    //   .catch((error) => console.log(error));
  };

  const headerList = ["Student", "Status", "Comment", "Action"];
  const renderEditAtendanceHeader = useCallback(() => {
    return (
      <div>
        <p className="text-primary-green text-3xl my-5">Student's Attendance</p>
        <div className="grid grid-cols-5 text-center font-bold italic my-2">
          {headerList.map((item, index) => {
            return (
              <p
                key={index}
                className={item == "Comment" ? "grid col-span-2" : ""}
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>
    );
  }, [headerList]);

  const renderEditAtendanceRow = (item) => {
    return (
      <div className="grid grid-cols-5 text-center p-1 justify-center items-center gap-1">
        <p>
          {item.last_name} {item.first_name}
        </p>
        <select
          className="bg-gray-200 p-1 text-center"
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
          className="p-1 truncate odd:bg-gray-200 grid col-span-2"
          defaultValue={item.comment}
          onChange={(e) => handleChangeComment(e, item)}
          // value={item.comment}
        />

        <div className="flex gap-3 text-xl justify-center">
          <button>
            <AiFillDelete className="text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) return null;

  return (
    <div className="ml-44">
      <EditDailyAttendance
        currentTeacher={currentTeacher}
        setCurrentTeacher={setCurrentTeacher}
        date={date}
        setDate={setDate}
      />
      <Table
        dataList={queryStudentAttendance}
        renderRow={renderEditAtendanceRow}
        renderHeader={renderEditAtendanceHeader}
      />
      <div className="flex justify-center m-5 ">
        <button
          className="rounded-lg bg-primary-green p-1 text-white font-semibold"
          onClick={handleUpdateStudentsAttendance}
        >
          update
        </button>
      </div>
    </div>
  );
};

export default EditStudentAttendance;
