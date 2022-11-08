import { useLocation, useNavigate } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import "../../../../index.css";
import UserType from "../commun/UserType";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PageNotFound from "../../PageNotFound";

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const pathSubdomain = "/" + location.pathname.split("/")[1];
  console.log("pathSubdomain: ", pathSubdomain);
  console.log("userSubdomain: ", user.subdomain);

  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    getStudentsList();
  }, []);

  const token = JSON.parse(localStorage.getItem("token"));

  const getStudentsList = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/students/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        setStudentsList(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/v1/students/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {pathSubdomain == user.subdomain ? (
        <div className="flex flex-col relative">
          <UserType />
          <div className="ml-3 md:ml-52">
            <div className="flex items-center justify-between mr-20">
              <p className="text-3xl py-3 text-primary-green ">Students List</p>
              <BsFillPlusCircleFill
                className="text-4xl text-primary-yellow cursor-pointer
             hover:text-primary-green"
                onClick={() =>
                  navigate(`${user.subdomain}/admin_panel/students/add_student`)
                }
              />
            </div>
            <div className="md:overflow-x-auto mr-3 md:mr-20">
              <div className="md:min-w-[800px]">
                <div
                  className="hidden md:grid grid-cols-12 my-2 place-items-center 
            font-semibold italic "
                >
                  <p>ID</p>
                  <p className="col-span-2">Name</p>
                  <p className="col-span-3">Email</p>
                  <p className="col-span-2">Phone</p>
                  <p className="col-span-2">Class Level</p>
                  <p className="col-span-2">Action</p>
                </div>
                <ul>
                  {studentsList.map((value, index) => {
                    return (
                      <li className="odd:bg-gray-200 p-2">
                        <div
                          className="grid grid-cols-6 md:grid-cols-12 place-items-center
                     text-center"
                        >
                          <p className="hidden md:grid">{value.id}</p>
                          <p className="col-span-2">
                            {value.first_name} {value.last_name}
                          </p>
                          <p className="hidden md:grid md:col-span-3 ">
                            {value.email}
                          </p>
                          <p className="hidden md:grid md:col-span-2">
                            {value.phone}
                          </p>
                          <p className="col-span-2">{value.level}</p>
                          <p className="col-span-2 flex gap-3 text-xl">
                            <button>
                              <BiShow className="text-primary-green" />
                            </button>
                            <button
                              onClick={() =>
                                navigate(`edit_student/${value.id}`)
                              }
                            >
                              <AiFillEdit className="text-primary-yellow" />
                            </button>
                            <button onClick={() => deleteStudent(value.id)}>
                              <AiFillDelete className="text-red-500" />
                            </button>
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Students;
