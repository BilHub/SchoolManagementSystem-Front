import React, { useEffect, useState } from "react";
import coursesAPI from "../../courses/commun/CourseAPI";

const SearchAttendanceStudents = () => {
  const [cycleList, setCycleList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState("");
  const [selectedLevelId, setSelectedLevelId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

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
    <form className="flex justify-around mr-10 my-5">
      <select
        onChange={(e) => setSelectedCycleId(e.target.value)}
        value={selectedCycleId}
        className="p-1 bg-gray-100"
      >
        {cycleList.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setSelectedLevelId(e.target.value)}
        value={selectedLevelId}
        className="p-1 bg-gray-100"
      >
        {levelList.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <select
        onChange={(e) => setSelectedClassId(e.target.value)}
        value={selectedClassId}
        className="p-1 bg-gray-100"
      >
        {classList.map((item, index) => {
          return <option key={item.id}>{item.subject_name}</option>;
        })}
      </select>
      <input
        placeholder="Date ..."
        name="date"
        className="w-[100px] p-1 border border-gray-200 focus:online-none"
      />
      <button
        type="submit"
        className="bg-primary-green rounded-md px-2 text-white hover:bg-primary-yellow"
      >
        View
      </button>
    </form>
  );
};

export default SearchAttendanceStudents;
