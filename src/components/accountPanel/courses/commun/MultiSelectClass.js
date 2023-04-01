import React, { useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import SelectLevel from "./SelectLevel";

import {
  getClassListRedux,
  resetClassListRedux,
  setSelectedClassIdRedux,
} from "../../../../redux/courseSlice";

const MultiSelectClass = () => {
  const dispatch = useDispatch();

  const { classList, selectedCycleId, selectedLevelId, selectedClassId } =
    useSelector((state) => state.courses);

  const classListOptions = classList.map((item) => {
    const new_item = {
      ...item,
      value: item.subject_name,
      label: item.subject_name,
    };
    delete new_item.subject_name;
    return new_item;
  });

  const handleChange = (selected) => {
    const idList = selected.map((item) => {
      return item.id;
    });
    dispatch(setSelectedClassIdRedux(idList));
  };

  useEffect(() => {
    if (
      selectedCycleId != null &&
      selectedLevelId != null &&
      selectedCycleId != "default" &&
      selectedLevelId != "default"
    ) {
      dispatch(getClassListRedux({ selectedCycleId, selectedLevelId }));
    } else dispatch(resetClassListRedux());
  }, [selectedCycleId, selectedLevelId]);

  return (
    <div className="flex gap-10">
      <SelectLevel />
      <Select options={classListOptions} isMulti onChange={handleChange} />
    </div>
  );
};

export default MultiSelectClass;
