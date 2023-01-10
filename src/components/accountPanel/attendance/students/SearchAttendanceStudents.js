import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";
import attendanceService from "../../../../services/attendanceService";
import SelectCourses from "../../courses/commun/SelectCourses";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";
import MultiSelectClass from "../../courses/commun/MultiSelectClass";

const SearchAttendanceStudents = ({ refetch }) => {
  const [cycleList, setCycleList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState("");
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    coursesAPI.getCyclelListAPI().then((response) => {
      setCycleList(response.data);
    });
  }, []);

  useEffect(() => {
    coursesAPI.getLevelListAPI(selectedCycleId).then((response) => {
      if (response) {
        setLevelList(response.data);
      }
    });
  }, [selectedCycleId]);

  useEffect(() => {
    coursesAPI
      .getClassListAPI(selectedCycleId, selectedLevelId)
      .then((response) => {
        if (response) {
          setClassList(response.data);
        }
      });
  }, [selectedCycleId, selectedLevelId]);

  return (
    <div>
      <SelectCourses />
      <div className="flex gap-10 items-center my-5">
        <DateSelectCourses />
        <button
          className="bg-primary-green rounded-md px-2 text-white hover:bg-primary-yellow"
          onClick={refetch}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default SearchAttendanceStudents;
