import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import authHeader from "../../../services/authHeader";
import SelectCourses from "../courses/commun/SelectCourses";
import StudentTeacherSelect from "../sharedComponents/StudentTeacherSelect";
import TableFinance from "./TableFinance";

const FinanceStudents = () => {
  const [studentsList, setStudentsList] = useState(undefined);
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );

  const fetchStudentsList = (id1, id2, id3) => {
    return axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => response.data);
  };

  const { data: queryStudentsList = [] } = useQuery(
    ["studentsListQuery", selectedCycleId, selectedLevelId, selectedClassId],
    () => fetchStudentsList(selectedCycleId, selectedLevelId, selectedClassId)
  );

  // const studentsList = [];
  return (
    <div className="ml-52 mt-10 mr-16">
      {/* <StudentTeacherSelect /> */}
      <SelectCourses />
      <TableFinance
        studentsList={studentsList ? studentsList : queryStudentsList}
      />
    </div>
  );
};

export default FinanceStudents;
