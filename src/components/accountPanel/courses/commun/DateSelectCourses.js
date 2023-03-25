import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateRedux } from "../../../../redux/courseSlice";

const DateSelectCourses = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.courses);
  return (
    <div className="flex items-center gap-2">
      <label className="text-primary-green font-semibold">Date:</label>
      <input
        placeholder="Date ..."
        type="date"
        name="date"
        value={date}
        className="w-[160px] p-1 border border-gray-200 focus:online-none"
        onChange={(e) => dispatch(setDateRedux(e.target.value))}
      />
    </div>
  );
};

export default DateSelectCourses;
