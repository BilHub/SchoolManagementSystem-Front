import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassListRedux,
  getCycleListRedux,
  getLevelListRedux,
  setSelectedClassIdRedux,
  setSelectedCycleIdRedux,
  setSelectedLevelIdRedux,
} from "../../../../redux/courseSlice";
// import coursesAPI from "./CourseAPI";

const SelectCourses = () => {
  const dispatch = useDispatch();
  //   const [cycleList, setCycleList] = useState([]);
  //   const [levelList, setLevelList] = useState([]);
  //   const [classList, setClassList] = useState([]);
  //   const [selectedCycleId, setSelectedCycleId] = useState("");
  //   const [selectedLevelId, setSelectedLevelId] = useState("");
  //   const [selectedClassId, setSelectedClassId] = useState("");

  const {
    cycleList,
    levelList,
    classList,
    selectedCycleId,
    selectedLevelId,
    selectedClassId,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    // coursesAPI.getCyclelListAPI().then((response) => {
    //   setCycleList(response.data);
    // });
    dispatch(getCycleListRedux());
  }, []);

  useEffect(() => {
    // coursesAPI.getLevelListAPI(selectedCycleId).then((response) => {
    //   if (response) {
    //     setLevelList(response.data);
    //   }
    // });
    dispatch(getLevelListRedux(selectedCycleId));
  }, [selectedCycleId]);

  useEffect(() => {
    // coursesAPI.getLevelListAPI(selectedCycleId).then((response) => {
    //   if (response) {
    //     setLevelList(response.data);
    //   }
    // });
    dispatch(getClassListRedux({ selectedCycleId, selectedLevelId }));
  }, [selectedCycleId, selectedLevelId]);

  return (
    <div className="flex justify-around">
      <select
        // onChange={(e) => setSelectedCycleId(e.target.value)}
        onChange={(e) => {
          dispatch(setSelectedCycleIdRedux(e));
          dispatch(setSelectedClassIdRedux(""));
        }}
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
        // onChange={(e) => setSelectedLevelId(e.target.value)}
        onChange={(e) => {
          dispatch(setSelectedLevelIdRedux(e));
          dispatch(setSelectedClassIdRedux(""));
        }}
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
        // onChange={(e) => setSelectedClassId(e.target.value)}
        // onChange={(e) => dispatch(setSelectedClassIdRedux(e))}
        onChange={(e) => dispatch(setSelectedClassIdRedux(e.target.value))}
        value={selectedClassId}
        className="p-1 bg-gray-100"
      >
        {classList.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.subject_name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SelectCourses;
