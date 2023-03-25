import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const EditCycle = memo(() => {
  const location = useLocation();
  const params = useParams();
  const cycle_id = params.id;
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const getCycleInfo = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/cycle/${cycle_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "JWT " + token,
          },
        }
      );
      setValue("name", response.data.name);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const { register, handleSubmit, watch, setValue } = useForm();
  const { data: queryCycleInfo = [] } = useQuery({
    queryKey: ["cycle-info"],
    queryFn: getCycleInfo,
  });

  const name = watch("name");

  const editCycle = async (data) => {
    // const payload = {
    //   ...data,
    //   cycle_id: location.state["cycle_id"],
    // };

    await axios
      .put(`http://127.0.0.1:8000/api/v1/cycle/${cycle_id}/`, data, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        console.log("cycle modified successfuly");
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
        onSubmit={handleSubmit(editCycle)}
        className="flex flex-col justify-center items-center gap-10"
      >
        <p className="text-primary-green text-3xl font-semibold">Cycle</p>
        <div className="flex flex-col items-center justify-center">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="bg-gray-200"
            defaultValue={queryCycleInfo?.name}
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

export default EditCycle;
