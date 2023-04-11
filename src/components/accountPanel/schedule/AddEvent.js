import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import SelectLevel from "../courses/commun/SelectLevel";

const AddEvent = () => {
  const { user } = useSelector((state) => state.auth);
  const { selectedLevelId, selectedCycleId } = useSelector(
    (state) => state.courses
  );
  const { register, handleSubmit } = useForm();
  const createEventMutation = useMutation({
    mutationFn: (newEvent) => {
      createEvent(newEvent);
    },
  });

  const createEvent = (newEvent) => {
    const token = JSON.parse(localStorage.getItem("token"));
    return axios.post("api/v1/schedule/", newEvent, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "JWT " + token,
      },
    });
  };
  const create = (data) => {
    const payload = {
      title: data["title"],
      description: data["description"],
      start_time: data["start_date"] + " " + data["start_time"],
      end_time: data["end_date"] + " " + data["end_time"],
      user: user.id,
      school: user.school,
      cycle: selectedCycleId,
      level: selectedLevelId,
    };
    createEventMutation.mutate(payload);
  };
  return (
    <form
      className=" flex flex-col items-center justify-center mt-10 gap-10"
      onSubmit={handleSubmit(create)}
    >
      <SelectLevel />
      <div>
        <label>Title:</label>
        <input placeholder="title ..." type="text" {...register("title")} />
      </div>
      <div>
        <label>description:</label>
        <input
          placeholder="description ..."
          type="text"
          {...register("description")}
        />
      </div>
      <div>
        <label>Start:</label>
        <input type="date" {...register("start_date")} />
        <input type="time" {...register("start_time")} />
      </div>
      <div>
        <label>End:</label>
        <input type="date" {...register("end_date")} />
        <input type="time" {...register("end_time")} />
      </div>
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold hover:bg-primary-green"
      >
        Create
      </button>
    </form>
  );
};

export default AddEvent;
