import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";
import attendanceService from "../../../../services/attendanceService";
import SelectCourses from "../../courses/commun/SelectCourses";
import DateSelectCourses from "../../courses/commun/DateSelectCourses";

const SearchAttendanceStudents = ({
  //  handleViewAttendance
  refetch,
}) => {
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
      <div className="flex gap-10 items-center justify-center">
        {/* <input
          placeholder="Date ..."
          type="date"
          name="date"
          className="w-[160px] p-1 border border-gray-200 focus:online-none"
          onChange={(e) => setDate(e.target.value)}
        /> */}
        <DateSelectCourses />
        <button
          className="bg-primary-green rounded-md px-2 text-white hover:bg-primary-yellow"
          // onClick={(e) =>
          //   handleViewAttendance(
          //     e,
          //     selectedCycleId,
          //     selectedLevelId,
          //     selectedClassId,
          //     date
          //   )
          // }
          onClick={refetch}
        >
          View
        </button>
      </div>
    </div>
    // <form className="flex justify-around mr-10 my-5">
    //   <select
    //     onChange={(e) => setSelectedCycleId(e.target.value)}
    //     value={selectedCycleId}
    //     className="p-1 bg-gray-100"
    //   >
    //     {cycleList.map((item, index) => {
    //       return (
    //         <option key={item.id} value={item.id}>
    //           {item.name}
    //         </option>
    //       );
    //     })}
    //   </select>
    //   <select
    //     onChange={(e) => setSelectedLevelId(e.target.value)}
    //     value={selectedLevelId}
    //     className="p-1 bg-gray-100"
    //   >
    //     {levelList.map((item, index) => {
    //       return (
    //         <option key={item.id} value={item.id}>
    //           {item.name}
    //         </option>
    //       );
    //     })}
    //   </select>
    //   <select
    //     onChange={(e) => setSelectedClassId(e.target.value)}
    //     value={selectedClassId}
    //     className="p-1 bg-gray-100"
    //   >
    //     {classList.map((item, index) => {
    //       return (
    //         <option key={item.id} value={item.id}>
    //           {item.subject_name}
    //         </option>
    //       );
    //     })}
    //   </select>
    //   <input
    //     placeholder="Date ..."
    //     type="date"
    //     name="date"
    //     className="w-[160px] p-1 border border-gray-200 focus:online-none"
    //     onChange={(e) => setDate(e.target.value)}
    //   />
    //   <button
    //     type="submit"
    //     className="bg-primary-green rounded-md px-2 text-white hover:bg-primary-yellow"
    //     // onClick={(e) =>
    //     //   handleViewAttendance(
    //     //     e,
    //     //     selectedCycleId,
    //     //     selectedLevelId,
    //     //     selectedClassId,
    //     //     date
    //     //   )
    //     // }
    //     onClick={refetch}
    //   >
    //     View
    //   </button>
    // </form>
  );
};

export default SearchAttendanceStudents;
