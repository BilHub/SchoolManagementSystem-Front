import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import authHeader from "../../../services/authHeader";
import SelectCourses from "../courses/commun/SelectCourses";
import StudentTeacherSelect from "../sharedComponents/StudentTeacherSelect";
import TableFinance from "./TableFinance";

const FinanceStudents = () => {
  const [studentsList, setStudentsList] = useState([]);
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );
  const { user } = useSelector((state) => state.auth);

  // const fetchStudentsList = (id1, id2, id3) => {
  //   return axios
  //     .get(
  //       `http://127.0.0.1:8000/api/v1/students/students_filter/?cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
  //       {
  //         headers: authHeader(),
  //       }
  //     )
  //     .then((response) => response.data);
  // };

  // const { data: queryStudentsList = [] } = useQuery(
  //   ["studentsListQuery", selectedCycleId, selectedLevelId, selectedClassId],
  //   () => fetchStudentsList(selectedCycleId, selectedLevelId, selectedClassId)
  // );

  const getAllStudents = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .get("http://127.0.0.1:8000/api/v1/students/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  const fetchStudentsCycleList = async (id1) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  const fetchStudentsLevelList = async (id1, id2) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}&level_id=${id2}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };
  const fetchStudentsSubjectList = async (id1, id2, id3) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  useEffect(() => {
    if (selectedCycleId == "default") {
      getAllStudents();
    } else fetchStudentsCycleList(selectedCycleId);
  }, [selectedCycleId]);

  useEffect(() => {
    if (selectedLevelId == "default") {
      fetchStudentsCycleList(selectedCycleId);
    } else fetchStudentsLevelList(selectedCycleId, selectedLevelId);
  }, [selectedLevelId]);

  useEffect(() => {
    if (selectedClassId == "default") {
      fetchStudentsLevelList(selectedCycleId, selectedLevelId);
    } else
      fetchStudentsSubjectList(
        selectedCycleId,
        selectedLevelId,
        selectedClassId
      );
  }, [selectedClassId]);

  useEffect(() => {
    getAllStudents();
  }, []);

  // const studentsList = [];
  return (
    <div className="ml-52 mt-10 mr-16">
      {/* <StudentTeacherSelect /> */}
      <SelectCourses />
      <TableFinance studentsList={studentsList} />
    </div>
  );
};

export default FinanceStudents;
