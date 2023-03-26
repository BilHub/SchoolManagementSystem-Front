import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import DetailAddStudent from "./DetailAddStudent";
import MainAddStudent from "./MainAddStudent";
import { useSelector } from "react-redux";
import MultiSelectClass from "../../courses/commun/MultiSelectClass";

const AddStudent = () => {
  const navigate = useNavigate();
  const [main, setMain] = useState(true);
  const { user } = useSelector((state) => state.auth);
  return (
    <section className="ml-5 md:ml-44 mt-5">
      <div className="flex flex-row items-center gap-5 text-primary-green">
        <BsArrowLeft
          className="text-3xl font-bold cursor-pointer hover:text-primary-yellow"
          onClick={() =>
            navigate(`${user.subdomain}/admin_panel/users/students`)
          }
        />
        <p className="flex mt-auto text-2xl">Back</p>
      </div>
      <MultiSelectClass />
      <div className="flex gap-3 ml-14 text-xl italic my-5 text-white">
        <button
          className={` p-1 rounded-lg ${
            main ? "bg-primary-yellow" : "bg-gray-400 "
          }`}
          onClick={() => setMain(true)}
        >
          Main
        </button>
        <button
          className={` p-1 rounded-lg ${
            main ? "bg-gray-400 " : "bg-primary-yellow"
          }`}
          onClick={() => setMain(false)}
        >
          Details
        </button>
      </div>
      {main ? <MainAddStudent /> : <DetailAddStudent />}
    </section>
  );
};

export default AddStudent;
