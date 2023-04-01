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
    dispatch(setSelectedCycleIdRedux("default"));
    dispatch(setSelectedLevelIdRedux("default"));
    dispatch(setSelectedClassIdRedux("default"));
  }, []);

  useEffect(() => {
    if (selectedCycleId != null && selectedCycleId != "default")
      dispatch(getLevelListRedux(selectedCycleId));
  }, [selectedCycleId]);

  useEffect(() => {
    if (
      selectedCycleId != null &&
      selectedLevelId != null &&
      selectedCycleId != "default" &&
      selectedLevelId != "default"
    ) {
      dispatch(getClassListRedux({ selectedCycleId, selectedLevelId }));
    }
  }, [selectedCycleId, selectedLevelId]);

  // useEffect(() => {
  //   if (classList.length != 0) {
  //     const subject_id = classList[0].id.toString();
  //     dispatch(setSelectedClassIdRedux(subject_id));
  //   }
  // }, [classList]);

  return (
    <div className="flex gap-10">
      <p className="text-xl font-semibold italic">Filter</p>
      <div>
        <span className="text-primary-green font-semibold">Cycle: </span>
        <select
          onChange={(e) => {
            dispatch(setSelectedCycleIdRedux(e.target.value));
          }}
          defaultValue="default"
          value={selectedCycleId}
          className="p-1 bg-gray-100"
        >
          <option value="default">Select cycle...</option>
          {cycleList.map((item, index) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span className="text-primary-green font-semibold">Level: </span>
        <select
          defaultValue="default"
          onChange={(e) => {
            dispatch(setSelectedLevelIdRedux(e.target.value));
          }}
          value={selectedLevelId}
          className="p-1 bg-gray-100"
        >
          <option value="default">Select level...</option>

          {levelList.map((item, index) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectLevel;
