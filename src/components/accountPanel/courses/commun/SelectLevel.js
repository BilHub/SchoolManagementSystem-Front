import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassListRedux,
  getCycleListRedux,
  getLevelListRedux,
  setSelectedClassIdRedux,
  setSelectedCycleIdRedux,
  setSelectedLevelIdRedux,
} from "../../../../redux/courseSlice";

const SelectLevel = () => {
  const dispatch = useDispatch();

  const { cycleList, levelList, classList, selectedCycleId, selectedLevelId } =
    useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(getCycleListRedux());
  }, []);

  useEffect(() => {
    dispatch(getLevelListRedux(selectedCycleId));
  }, [selectedCycleId]);

  useEffect(() => {
    dispatch(getClassListRedux({ selectedCycleId, selectedLevelId }));
  }, [selectedCycleId, selectedLevelId]);

  useEffect(() => {
    if (classList.length != 0) {
      const subject_id = classList[0].id.toString();
      dispatch(setSelectedClassIdRedux(subject_id));
    }
  }, [classList]);

  return (
    <div className="flex gap-10">
      <select
        onChange={(e) => {
          dispatch(setSelectedCycleIdRedux(e.target.value));
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
        onChange={(e) => {
          dispatch(setSelectedLevelIdRedux(e.target.value));
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
    </div>
  );
};

export default SelectLevel;