import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import coursesService from "../../../../services/coursesService";
import { api } from "../../../../utils/backend.instance";

const AddLevel = ({ refetch }) => {
  const { cycleList } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { data: cycleListResponse = [] } = useQuery(
    ["cycle-list"],
    coursesService.getCycleList
  );

  const addLevel = (data) => {
    const payload = {
      ...data,
      school_id: user.school,
    };
    api
      .post("api/v1/level/", payload, {
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
      className=" flex flex-col lg:flex-row items-center justify-center mt-16 gap-5 lg:gap-10"
      onSubmit={handleSubmit(addLevel)}
    >
      <div>
        <label>Cycle: </label>
        <select
          {...register("cycle_id", { required: true })}
          className="p-1 bg-gray-100"
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
        <label className="hidden md:inline-block">Level: </label>
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
