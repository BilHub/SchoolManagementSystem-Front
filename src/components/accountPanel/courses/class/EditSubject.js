import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const EditSubject = memo(() => {
  const location = useLocation();
  const params = useParams();
  const subject_id = params.id;
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  const getSubjectInfo = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/subject/${subject_id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: "JWT " + token,
          },
        }
      );
      console.log("subjectInfo data: ", response.data);
      setValue("subject_name", response.data["subject_name"]);
      return response.data;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const { register, handleSubmit, watch, setValue } = useForm();
  const { data: querySubjectInfo = [] } = useQuery({
    queryKey: ["subject-info"],
    queryFn: getSubjectInfo,
  });

  const subject_name = watch("subject_name");

  const editSubject = async (data) => {
    const payload = {
      ...data,
      level_id: location.state["level_id"],
      cycle_id: location.state["cycle_id"],
    };

    await axios
      .put(`http://127.0.0.1:8000/api/v1/subject/${subject_id}/`, payload, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        console.log("subject modified successfuly");
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
        onSubmit={handleSubmit(editSubject)}
        className="flex flex-col justify-center items-center gap-10"
      >
        <p className="text-primary-green text-3xl font-semibold">Subject</p>
        <div className="flex flex-col items-center justify-center">
          <label>Name:</label>
          <input
            type="text"
            name="subject_name"
            className="bg-gray-200"
            // defaultValue={querySubjectInfo?.subject_name}
            {...register("subject_name", {
              value: subject_name,
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

export default EditSubject;
