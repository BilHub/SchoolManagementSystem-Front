import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import coursesService from "../../../../services/coursesService";

const AddLevel = ({ refetch }) => {
  const { cycleList } = useSelector((state) => state.courses);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //   const [selectedCycleId, setSelectedCycleId] = useState(cycleList[0].id);
  const { data: cycleListResponse = [] } = useQuery(
    ["cycle-list"],
    coursesService.getCycleList
  );

  //   const handleSelectedCycle = (e) => {
  //     setSelectedCycleId(e.target.value);
  //   };

  const addLevel = (data) => {
    axios
      .post("http://127.0.0.1:8000/api/v1/level/", data, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => refetch())
      .catch((error) => console.log(error));
  };

  return (
    <form
      className=" flex items-center justify-center mt-10 gap-10"
      onSubmit={handleSubmit(addLevel)}
    >
      <div>
        <label>Cycle: </label>
        <select
          {...register("cycle_id", { required: true })}
          className="p-1 bg-gray-100"
          //   value={selectedCycleId}
          //   onChange={handleSelectedCycle}
        >
          {cycleListResponse.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-3 items-center">
        <label>Level: </label>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter the level name ..."
          className="border border-gray-200 p-1 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold hover:bg-primary-green"
      >
        Add a Level
      </button>
    </form>
  );
};

export default memo(AddLevel);