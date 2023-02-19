import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectLevel from "../../courses/commun/SelectLevel";

import { setSelectedClassIdRedux } from "../../../../redux/courseSlice";

const SelectCourses = () => {
  const dispatch = useDispatch();

  const { classList, selectedClassId } = useSelector((state) => state.courses);

  return (
    <div className="flex gap-10 justify-center">
      <SelectLevel />
      <select
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