import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AddClass = ({ addNewClass }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [levelList, setLevelList] = useState([]);
  const [cycleList, setCycleList] = useState([]);
  const [selectedCycleId, setSelectedCycleId] = useState("");

  const getCyclelList = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/cycle/", {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => setCycleList(response.data))
      .catch((error) => console.log(error));
  };

  const getLevelList = (id) => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/level/?cycle_id=${id}`, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => setLevelList(response.data))
      .catch((error) => console.log(error));
  };

  const handleSelectedCycle = (e) => {
    setSelectedCycleId(e.target.value);
  };

  const addClass = (data) => {
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/api/v1/subject/", data, {
        headers: {
          "Content-type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => addNewClass(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCyclelList();
  }, []);

  useEffect(() => {
    getLevelList(selectedCycleId);
  }, [selectedCycleId]);
  return (
    <form
      className=" flex justify-between items-center my-10"
      onSubmit={handleSubmit(addClass)}
    >
      <button
        type="submit"
        className="rounded-md text-white bg-primary-yellow p-2 font-semibold"
      >
        Add a Class
      </button>
      <div>
        <label>Cycle: </label>
        <select
          {...register("cycle", { required: true })}
          className="p-1 bg-gray-100"
          value={selectedCycleId}
          onChange={handleSelectedCycle}
        >
          {cycleList.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label>Level: </label>
        <select
          {...register("level", { required: true })}
          className="p-1 bg-gray-100"
        >
          {levelList.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-3 items-center">
        <label>Class: </label>
        <input
          {...register("subject_name", { required: true })}
          type="text"
          placeholder="Enter the class name ..."
          className="border border-gray-200 p-1 focus:outline-none"
        />
      </div>
    </form>
  );
};

export default AddClass;
