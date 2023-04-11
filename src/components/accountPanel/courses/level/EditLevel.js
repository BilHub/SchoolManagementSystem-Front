import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { api } from "../../../../utils/backend.instance";

const EditLevel = memo(() => {
  const location = useLocation();
  const params = useParams();
  const level_id = params.id;
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const getLevelInfo = async () => {
    try {
      const response = await api.get(`api/v1/level/${level_id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      });
      setValue("name", response.data.name);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const { register, handleSubmit, watch, setValue } = useForm();
  const { data: queryLevelInfo = [] } = useQuery({
    queryKey: ["level-info"],
    queryFn: getLevelInfo,
  });

  const name = watch("name");

  const editLevel = async (data) => {
    const payload = {
      ...data,
      cycle_id: location.state["cycle_id"],
    };

    await api
      .put(`http://127.0.0.1:8000/api/v1/level/${level_id}/`, payload, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        console.log("level modified successfuly");
        navigate(location.state["previousURL"]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col w-screen mt-10">
      <div
        className="flex flex-row items-center gap-3 text-primary-green ml-44 cursor-pointer hover:text-primary-yellow"
        onClick={() => navigate(location.state["previousURL"])}
      >
        <BsArrowLeft className="text-3xl font-bold " />
        <p className="flex mt-auto text-2xl italic">Back</p>
      </div>
      <form
        onSubmit={handleSubmit(editLevel)}
        className="flex flex-col justify-center items-center gap-10"
      >
        <p className="text-primary-green text-3xl font-semibold">Level</p>
        <div className="flex flex-col items-center justify-center">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="bg-gray-200"
            defaultValue={queryLevelInfo?.name}
            {...register("name", {
              value: name,
            })}
          />
        </div>
        <div className="flex gap-10">
          <button
            type="submit"
            className="bg-primary-green rounded rounded-md text-white p-1"
          >
            Modify
          </button>
          <button className="bg-red-500 rounded rounded-md text-white p-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
});

export default EditLevel;
