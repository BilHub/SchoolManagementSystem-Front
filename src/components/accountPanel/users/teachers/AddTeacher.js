import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .min(5, "minimum length is 5")
      .required("this field is required"),
    last_name: yup.string().min(5).required("this field is required"),
    email: yup
      .string("email not valid")
      .email("please provid a valid address")
      .required("this field is required"),
    phone: yup
      .number("phone should be number !!")
      .positive("phone not valid can't be negatif")
      .required("this field is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const addTeacher = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/teachers/", data, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        navigate(location.state);
      })
      .catch((err) => console.log(err));
    reset();
  };
  return (
    <section className="ml-5 md:ml-44 mt-5">
      <div className="flex flex-row items-center gap-5 text-primary-green">
        <BsArrowLeft
          className="text-3xl font-bold cursor-pointer hover:text-primary-yellow"
          onClick={() => navigate(location.state)}
        />
        <p className="flex mt-auto text-2xl">Back</p>
      </div>
      <form onSubmit={handleSubmit(addTeacher)}>
        <div className="flex flex-col ml-14 mr-32 gap-3">
          <div className="flex gap-3 items-center">
            <label className="w-[200px]">Gender :</label>
            <div className="flex items-center gap-2 mr-5">
              <p>Male</p>
              <input className="" type="radio" value="MALE" />
            </div>
            <div className="flex items-center gap-2">
              <p>Female</p>
              <input className="" type="radio" value="FEMALE" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <label className="w-[200px]">First Name :</label>
              <input
                className="w-4/5 outline outline-gray-200 p-1"
                type="text"
                id="first_name"
                name="first_name"
                required
                {...register("first_name")}
              />
            </div>
            <span className="text-xs text-red-500 ml-[200px] p-1">
              {errors.first_name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3">
              <label className="w-[200px]">Last Name :</label>
              <input
                className="w-4/5 outline outline-gray-200 p-1"
                type="text"
                id="last_name"
                name="last_name"
                {...register("last_name")}
                required
              />
            </div>
            <span className="text-xs text-red-500 ml-[200px] p-1">
              {errors.last_name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3">
              <label className="w-[200px]">Email :</label>
              <input
                className="w-4/5 outline outline-gray-200 p-1"
                type="email"
                id="email"
                name="email"
                {...register("email")}
                required
              />
            </div>
            <span className="text-xs text-red-500 ml-[200px] p-1">
              {errors.email?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-3">
              <label className="w-[200px]">Phone :</label>
              <input
                className="w-4/5 outline outline-gray-200 p-1"
                type="text"
                id="phone"
                name="phone"
                {...register("phone")}
                required
              />
            </div>
            <p>{errors.phone?.message}</p>
          </div>
        </div>
        <div className="flex justify-center m-5">
          <button
            className="bg-primary-green w-[80px] p-1 rounded-lg text-white
           text-xl hover:bg-primary-yellow"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddTeacher;
