import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDateRedux } from "../../../../redux/courseSlice";

const DateSelectCourses = () => {
  const dispatch = useDispatch();
  const { date } = useSelector((state) => state.courses);
  return (
    <input
      placeholder="Date ..."
      type="date"
      name="date"
      value={date}
      className="w-[160px] p-1 border border-gray-200 focus:online-none"
      onChange={(e) => dispatch(setDateRedux(e.target.value))}
    />
  );
};

export default DateSelectCourses;
