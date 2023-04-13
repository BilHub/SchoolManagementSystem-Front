import { BsArrowLeft } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {api} from "../../../../utils/backend.instance";

const EditTeacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const teacher_id = location.pathname.charAt(location.pathname.length - 1);
  console.log("teacher_id: ", teacher_id);

  // const schema = yup.object().shape({
  //   first_name: yup
  //     .string()
  //     .min(5, "minimum length is 5")
  //     .required("this field is required"),
  //   last_name: yup.string().min(5).required("this field is required"),
  //   email: yup
  //     .string("email not valid")
  //     .email("please provid a valid address")
  //     .required("this field is required"),
  //   phone: yup
  //     .number("phone should be number !!")
  //     .positive("phone not valid can't be negatif")
  //     .required("this field is required"),
  // });

  const getTeacherInfo = async () => {
    return await api
      .get(`api/v1/teachers/${teacher_id}/`)
      .then((response) => {
        setValue("first_name", response.data.first_name);
        setValue("last_name", response.data.last_name);
        setValue("email", response.data.email);
        setValue("phone", response.data.phone);
        return response.data;
      })
      .catch((error) => console.log("error: ", error));
  };

  const { data: teacherInfo = [], refetch } = useQuery(
    ["teacher-info"],
    getTeacherInfo
  );

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
    setValue,
  } = useForm({
    // resolver: yupResolver(schema),
  });

  const editTeacher = async (data) => {
    await api
      .put(`api/v1/teachers/${teacher_id}/`, data)
      .then((response) => {
        refetch();
        navigate(location.state);
      })
      .catch((err) => console.log(err));
    // reset();
  };
  const first_name = watch("first_name");
  const last_name = watch("last_name");
  const email = watch("email");
  const phone = watch("phone");
  return (
    <section className="ml-5 md:ml-44 mt-5">
      <div className="flex flex-row items-center gap-5 text-primary-green">
        <BsArrowLeft
          className="text-3xl font-bold cursor-pointer hover:text-primary-yellow"
          onClick={() => navigate(location.state)}
        />
        <p className="flex mt-auto text-2xl">Back</p>
      </div>
      <form onSubmit={handleSubmit(editTeacher)}>
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
                // value={first_name ? first_name : teacherInfo?.first_name}
                defaultValue={teacherInfo?.first_name}
                required
                {...register("first_name", {
                  // value: first_name ? first_name : teacherInfo.first_name,
                  value: first_name,
                })}
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
                // value={last_name ? last_name : teacherInfo?.last_name}
                defaultValue={teacherInfo?.last_name}
                {...register("last_name", {
                  value: last_name,
                  // value: last_name ? last_name : teacherInfo.last_name,
                })}
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
                // value={email ? email : teacherInfo?.email}
                defaultValue={teacherInfo?.email}
                {...register("email", {
                  value: email,
                  // value: email ? email : teacherInfo.email,
                })}
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
                // value={phone ? phone : teacherInfo?.phone}
                defaultValue={teacherInfo?.phone}
                {...register("phone", {
                  value: phone,
                  // value: phone ? phone : teacherInfo.phone,
                })}
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
            Edit
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTeacher;
