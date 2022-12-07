import React from "react";

const EditDailyAttendance = () => {
  return (
    <div className="flex flex-col mt-10 gap-3">
      <div className="flex justify-around">
        <div className="flex gap-2">
          <p>Cycle:</p>
          <p>Lycée</p>
        </div>
        <div className="flex gap-2">
          <p>Level:</p>
          <p>3ème année lycée</p>
        </div>
        <div className="flex gap-2">
          <p>Subject:</p>
          <p>L/science</p>
        </div>
      </div>
      <div className="flex justify-around">
        <select className="">
          <option>Teacher1</option>
          <option>Teacher2</option>
        </select>
        <input className="" type="date" name="date" />
        <button className="bg-primary-green rounded-md w-[100px] text-white font-semibold hover:bg-primary-yellow">
          Modify
        </button>
      </div>
    </div>
  );
};

export default EditDailyAttendance;
