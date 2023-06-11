import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  getCycleListRedux,
  getLevelListRedux,
} from "../../../../redux/courseSlice";
import coursesService from "../../../../services/coursesService";
import { api } from "../../../../utils/backend.instance";
import UserType from "../../users/commun/UserType";

const AddClass = ({ refetch }) => {
  const dispatch = useDispatch();
  const { cycleList } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCycleListRedux());
    dispatch(getLevelListRedux());
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [selectedCycleId, setSelectedCycleId] = useState(
    cycleList.length ? cycleList[0].id : null
  );
  // const { data: cycleListResponse = [] } = useQuery(
  //   ["cycle-list"],
  //   coursesService.getCycleList
  // );
  const { data: levelListResponse = [] } = useQuery(
    ["level-list", selectedCycleId],
    () => coursesService.getLevelList(selectedCycleId)
  );

  const levelList = useMemo(() => {
    return levelListResponse || [];
  }, [levelListResponse]);

  const handleSelectedCycle = (e) => {
    setSelectedCycleId(e.target.value);
  };

  const addClass = (data) => {
    const payload = {
      ...data,
      school_id: user.school,
    };
    api
      .post("api/v1/subject/", payload, {
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
      className=" flex flex-col md:flex-row items-center justify-center mt-16 gap-5 md:gap-10"
      onSubmit={handleSubmit(addClass)}
    >
      <div className="flex items-center">
        <label>Cycle: </label>
        <select
          {...register("cycle_id", { required: true })}
          className="p-1 bg-gray-100"
          value={selectedCycleId}
          onChange={handleSelectedCycle}
        >
          {cycleList?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex items-center">
        <label>Level: </label>
        <select
          {...register("level_id", { required: true })}
          className="p-1 bg-gray-100"
        >
          {levelList?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-3 items-center">
        <label>Subject: </label>
        <input
          {...register("subject_name", { required: true })}
          type="text"
          placeholder="Enter the class name ..."
          className="border border-gray-200 p-1 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold hover:bg-primary-green"
      >
        Add a Subject
      </button>
    </form>
  );
};

export default memo(AddClass);
