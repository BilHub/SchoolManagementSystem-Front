import { BsFillPlusCircleFill } from "react-icons/bs";
import "../../../../index.css";
import UserType from "../commun/UserType";
import TableTeacher from "./TableTeacher";
import { useQuery } from "@tanstack/react-query";
import teachersService from "../../../../services/teachersService";
import { useLocation, useNavigate } from "react-router-dom";
import Search from "../commun/Search";
import { useState } from "react";
import axios from "axios";
import { api } from "../../../../utils/backend.instance";

const Teacher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));

  const { data: queryTeachersList = [] } = useQuery(
    ["teachers-list"],
    teachersService.getTeachersList
  );

  const [teachersList, setTeachersList] = useState(null);

  const getSelectedTeacher = async (id) => {
    await api
      .get(`api/v1/teachers/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) =>
        // console.log("response data: ", response.data)
        setTeachersList([response.data])
      )
      .catch((error) => console.log("error: ", error));
  };

  const getAllTeachers = async () => {
    await api
      .get("api/v1/teachers/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => setTeachersList(response.data))
      .catch((error) => console.log("error: ", error));
  };

  // useEffect(() => {
  //   setTeachersList(queryTeachersList);
  // }, []);

  return (
    <div className="flex flex-col">
      <UserType />
      <Search
        queryList={queryTeachersList}
        getSelectedItem={getSelectedTeacher}
        getAllItems={getAllTeachers}
      />
      <div className="ml-52">
        <div className="flex items-center justify-between mr-20">
          <p className="text-3xl py-3 text-primary-green ">Teachers List</p>
          <BsFillPlusCircleFill
            className="text-4xl text-primary-yellow cursor-pointer
            hover:text-primary-green"
            onClick={() =>
              navigate(`${location.pathname}/add_teacher`, {
                state: location.pathname,
              })
            }
          />
        </div>
        <TableTeacher
          teachersList={teachersList ? teachersList : queryTeachersList}
        />
      </div>
    </div>
  );
};

export default Teacher;
