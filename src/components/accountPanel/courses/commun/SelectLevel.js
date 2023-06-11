import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassListRedux,
  getCycleListRedux,
  getLevelListRedux,
  resetClassListRedux,
  resetCycleListRedux,
  resetLevelListRedux,
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
    dispatch(resetClassListRedux());
    dispatch(resetLevelListRedux());
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

  return (
    <div className="flex flex-col md:flex-row gap-5 md:gap-10">
      <div>
        <span className="text-primary-green font-semibold hidden md:inline-block">
<<<<<<< HEAD
          Cycle:
=======
          Cycle:{" "}
>>>>>>> 57605ac4c1da55c38a102c0ca39781f5acdcbac3
        </span>
        <select
          onChange={(e) => {
            dispatch(setSelectedCycleIdRedux(e.target.value));
            if (e.target.value == "default") {
              dispatch(setSelectedLevelIdRedux("default"));
              dispatch(setSelectedClassIdRedux("default"));
              dispatch(resetClassListRedux());
              dispatch(resetLevelListRedux());
            }
          }}
          defaultValue="default"
          value={selectedCycleId}
          className="p-1 bg-gray-100"
        >
          <option value="default">Select cycle...</option>
          {cycleList?.map((item, index) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <span className="text-primary-green font-semibold hidden md:inline-block">
<<<<<<< HEAD
          Level:
=======
          Level:{" "}
>>>>>>> 57605ac4c1da55c38a102c0ca39781f5acdcbac3
        </span>
        <select
          defaultValue="default"
          onChange={(e) => {
            dispatch(setSelectedLevelIdRedux(e.target.value));
            if (e.target.value == "default") {
              dispatch(setSelectedClassIdRedux("default"));
              dispatch(resetClassListRedux());
            }
          }}
          value={selectedLevelId}
          className="p-1 bg-gray-100"
        >
          <option value="default">Select level...</option>

          {levelList?.map((item, index) => {
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
