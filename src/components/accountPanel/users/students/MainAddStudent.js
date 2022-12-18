import axios from "axios";
import { useForm } from "react-hook-form";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "../../../../index.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const MainAddStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location: ", location);
  // USERFORM STATE
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const location = useLocation();
  // const addingStudent = location.pathname.split("/").includes("add_student");

  const token = JSON.parse(localStorage.getItem("token"));

  // const token = useState(() => localStrorage.get("item "))
  // lazy state initializer (React)

  const save = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/api/v1/students/", data, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        navigate(location.state.previousUrl);
      })
      .catch((err) => console.log(err));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(save)}>
        <div className="flex flex-col ml-14 mr-32 gap-3">
          <div className="flex gap-3 items-center">
            <label className="w-[200px]">Gender :</label>
            <div className="flex items-center gap-2 mr-5">
              <p>Male</p>
              <input
                className=""
                type="radio"
                // name="gender"
                // onChange={(e) => setGender(e.target.value)}
                value="MALE"
                // {...register("gender")}
              />
            </div>
            <div className="flex items-center gap-2">
              <p>Female</p>
              <input
                className=""
                type="radio"
                // name="gender"
                // onChange={(e) => setGender(e.target.value)}
                // {...register("gender")}
                value="FEMALE"
              />
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
                // ref={register}
                // defaultValue={studentInfo ? studentInfo.first_name : ""}
                // onChange={(e) => setFirst_name(e.target.value)}
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
                // inputRef={register}
                // onChange={(e) => setLast_name(e.target.value)}
                // value={last_name}
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
                // inputRef={register}
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
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
                // inputRef={register}
                // onChange={(e) => setPhone(e.target.value)}
                // value={phone}
                {...register("phone")}
                required
              />
            </div>
            <p>{errors.phone?.message}</p>
          </div>
          {/* <div className="flex gap-3">
            <label className="w-[200px]">Class :</label>
            <select
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              className="w-[300px] bg-white outline outline-gray-200"
              placeholder="class level"
            >
              <option value="" disabled className="text-gray-400">
                --- select a class level ---
              </option>
              <option>primary-1</option>
              <option>primary-2</option>
              <option>primary-3</option>
            </select>
          </div> */}
        </div>
        <div className="flex justify-center m-5">
          <button
            className="bg-primary-green w-[80px] p-1 rounded-lg text-white
           text-xl hover:bg-primary-yellow"
            type="submit"
            // onClick={save}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default MainAddStudent;
