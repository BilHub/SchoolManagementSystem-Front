import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setSelectedCycleIdRedux,
  setSelectedLevelIdRedux,
} from "../../../redux/courseSlice";
import { api } from "../../../utils/backend.instance";
import SelectLevel from "../courses/commun/SelectLevel";

const EditEvent = () => {
  const params = useParams();
  const eventId = params.id;
  const { user } = useSelector((state) => state.auth);
  const { selectedLevelId, selectedCycleId } = useSelector(
    (state) => state.courses
  );
  const { register, handleSubmit, watch } = useForm();
  const editEventMutation = useMutation({
    mutationFn: (newEvent) => {
      editEvent(newEvent);
    },
  });
  const dispatch = useDispatch();

  const getEventInfo = async () => {
    return api.get(`api/v1/schedule/${eventId}/`).then((response) => {
      console.log("response: ", response.data);
      dispatch(setSelectedCycleIdRedux(response.data.cycle));
      dispatch(setSelectedLevelIdRedux(response.data.level));
      return response.data;
    });
  };

  const { data: queryEventInfo = [] } = useQuery({
    queryKey: ["event-info", eventId],
    queryFn: (eventId) => getEventInfo(eventId),
  });

  const editEvent = (newEvent) => {
    // const token = JSON.parse(localStorage.getItem("token"));
    return api.put(
      `api/v1/schedule/${eventId}/`,
      newEvent
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     accept: "application/json",
      //     Authorization: "JWT " + token,
      //   },
      // }
    );
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
    editEventMutation.mutate(payload);
  };
  return (
    <form
      className=" flex flex-col items-center justify-center mt-10 gap-10"
      onSubmit={handleSubmit(create)}
    >
      <SelectLevel />
      <div>
        <label>Title:</label>
        <input
          placeholder="title ..."
          type="text"
          {...register("title", { value: watch("title") })}
          defaultValue={queryEventInfo?.title}
        />
      </div>
      <div>
        <label>description:</label>
        <input
          placeholder="description ..."
          type="text"
          {...register("description", { value: watch("description") })}
          defaultValue={queryEventInfo?.description}
        />
      </div>
      <div>
        <label>Start:</label>
        <input
          type="date"
          {...register("start_date", { value: watch("start_date") })}
          defaultValue={queryEventInfo?.start_time?.split(" ")[0]}
        />
        <input
          type="time"
          {...register("start_time", { value: watch("start_time") })}
          defaultValue={queryEventInfo?.start_time?.split(" ")[1]}
        />
      </div>
      <div>
        <label>End:</label>
        <input
          type="date"
          {...register("end_date", { value: watch("end_date") })}
          defaultValue={queryEventInfo?.end_time?.split(" ")[0]}
        />
        <input
          type="time"
          {...register("end_time", { value: watch("end_time") })}
          defaultValue={queryEventInfo?.end_time?.split(" ")[1]}
        />
      </div>
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold hover:bg-primary-green"
      >
        Edit
      </button>
    </form>
  );
};

export default EditEvent;
