import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import coursesService from "../../../../services/coursesService";
import { api } from "../../../../utils/backend.instance";
import UserType from "../../users/commun/UserType";

const AddCycle = ({ refetch }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addCycle = (data) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const payload = {
      ...data,
      school: user.school,
    };
    api
      .post(
        "api/v1/cycle/",
        payload
        //  {
        //   headers: {
        //     "Content-type": "application/json",
        //     accept: "application/json",
        //     Authorization: "JWT " + token,
        //   },
        // }
      )
      .then((response) => refetch())
      .catch((error) => console.log(error));
  };

  return (
    <form
      className=" flex flex-col md:flex-row items-center justify-center mt-16 gap-5 md:gap-10"
      onSubmit={handleSubmit(addCycle)}
    >
      <div className="flex flex-col gap-3 items-center md:flex-row">
        <label>Cycle: </label>
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="Enter the cycle name ..."
          className="border border-gray-200 p-1 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold hover:bg-primary-green"
      >
        Add a Cycle
      </button>
    </form>
  );
};

export default memo(AddCycle);
