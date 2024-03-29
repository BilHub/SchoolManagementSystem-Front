import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectLevel from "../../courses/commun/SelectLevel";

import { setSelectedClassIdRedux } from "../../../../redux/courseSlice";

const SelectCourses = () => {
  const dispatch = useDispatch();

  const { classList, selectedClassId } = useSelector((state) => state.courses);

  return (
    <div className="flex flex-col lg:flex-row gap-5 md:gap-10 justify-center items-center ">
      <SelectLevel />
      <div>
        <span className="text-primary-green font-semibold hidden md:inline-block">
          Subject:
        </span>
        <select
          onChange={(e) => dispatch(setSelectedClassIdRedux(e.target.value))}
          value={selectedClassId}
          className="p-1 bg-gray-100"
        >
          <option value="default">Select subject...</option>

          {classList.map((item, index) => {
            return (
              <option key={item.id} value={item.id}>
                {item.subject_name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default SelectCourses;
