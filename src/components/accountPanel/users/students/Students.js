import { useLocation, useNavigate } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import "../../../../index.css";
import UserType from "../commun/UserType";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "../../PageNotFound";
import { useQuery } from "@tanstack/react-query";
import studentsService from "../../../../services/studentsService";
import TableStudent from "./TableStudent";
import SelectCourses from "../../courses/commun/SelectCourses";
import axios from "axios";
import authHeader from "../../../../services/authHeader";
import Search from "../commun/Search";
import { useEffect, useState } from "react";
import { getCycleListRedux } from "../../../../redux/courseSlice";

const Students = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { selectedCycleId, selectedLevelId, selectedClassId } = useSelector(
    (state) => state.courses
  );
  const pathSubdomain = "/" + location.pathname.split("/")[1];

  // const fetchStudentsList = (id1, id2, id3) => {
  //   return axios
  //     .get(
  //       `http://127.0.0.1:8000/api/v1/students/students_filter/?school=${user.school}&cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
  //       {
  //         headers: authHeader(),
  //       }
  //     )
  //     .then((response) => response.data);
  // };

  // const { data: queryStudentsList = [] } = useQuery(
  //   ["studentsListQuery", selectedCycleId, selectedLevelId, selectedClassId],
  //   () =>
  //     fetchStudentsList(selectedCycleId, selectedLevelId, selectedClassId, {
  //       onSuccess: setStudentsList(queryStudentsList),
  //     })
  // );
  const [studentsList, setStudentsList] = useState([]);
  const [allStudentsList, setAllStudentsList] = useState([]);
  const dispatch = useDispatch();

  const getSelectedStudent = async (id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .get(`http://127.0.0.1:8000/api/v1/students/${id}/`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        setStudentsList([response.data]);
      })
      .catch((error) => console.log("error: ", error));
  };

  const getAllStudents = async () => {
    const token = JSON.parse(localStorage.getItem("token"));

    await axios
      .get("http://127.0.0.1:8000/api/v1/students/", {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  const fetchStudentsCycleList = async (id1) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
        setAllStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  const fetchStudentsLevelList = async (id1, id2) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}&level_id=${id2}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };
  const fetchStudentsSubjectList = async (id1, id2, id3) => {
    await axios
      .get(
        `http://127.0.0.1:8000/api/v1/students/students_filter/?school_id=${user.school}&cycle_id=${id1}&level_id=${id2}&subjects=${id3}`,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        console.log("all students are: ", response.data);
        setStudentsList(response.data);
      })
      .catch((error) => console.log("error: ", error));
  };

  useEffect(() => {
    if (selectedCycleId == "default") {
      getAllStudents();
    } else fetchStudentsCycleList(selectedCycleId);
  }, [selectedCycleId]);

  useEffect(() => {
    if (selectedLevelId == "default") {
      fetchStudentsCycleList(selectedCycleId);
    } else fetchStudentsLevelList(selectedCycleId, selectedLevelId);
  }, [selectedLevelId]);

  useEffect(() => {
    if (selectedClassId == "default") {
      fetchStudentsLevelList(selectedCycleId, selectedLevelId);
    } else
      fetchStudentsSubjectList(
        selectedCycleId,
        selectedLevelId,
        selectedClassId
      );
  }, [selectedClassId]);

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <>
      {pathSubdomain == user.subdomain ? (
        <div className="flex flex-col relative">
          <UserType />
          <Search
            queryList={allStudentsList}
            setList={setStudentsList}
            getSelectedItem={getSelectedStudent}
            getAllItems={getAllStudents}
          />
          <SelectCourses />
          <div className="ml-3 md:ml-52">
            <div className="flex items-center justify-between mr-20">
              <p className="text-3xl py-3 text-primary-green ">Students List</p>
              <BsFillPlusCircleFill
                className="text-4xl text-primary-yellow cursor-pointer
             hover:text-primary-green"
                onClick={() =>
                  navigate(
                    `${user.subdomain}/admin_panel/users/students/add_student`
                  )
                }
              />
            </div>
            <TableStudent studentsList={studentsList} />
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default Students;
