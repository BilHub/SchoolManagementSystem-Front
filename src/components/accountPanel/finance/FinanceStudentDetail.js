import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ModalAddPayement from "./ModalAddPayement";
import TableDetailFinance from "./TableDetailFinance";

const FinanceStudentDetail = () => {
  const location = useLocation();
  const student_id = location.pathname.charAt(location.pathname.length - 1);
  console.log("student_id: ", student_id);
  const token = JSON.parse(localStorage.getItem("token"));
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => {
    setShowModal(true);
  };

  const fetchStudentPayement = (student_id) => {
    return axios
      .get(
        `http://127.0.0.1:8000/api/v1/finance/student_payement/?student=${student_id}`
      )
      .then((response) => response.data);
  };
  const fetchStudentInfos = (student_id) => {
    return axios
      .get(`http://127.0.0.1:8000/api/v1/students/${student_id}`, {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: "JWT " + token,
        },
      })
      .then((response) => response.data);
  };

  const {
    data: studentPayements = [],
    isLoading: payementLoading,
    refetch,
  } = useQuery(["student_payements", student_id], () =>
    fetchStudentPayement(student_id)
  );
  const { data: studentInfos = [], isLoading: studentLoading } = useQuery(
    ["student_infos", student_id],
    () => fetchStudentInfos(student_id)
  );

  if (studentLoading || payementLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ml-44 mr-10 mt-5">
      <ModalAddPayement
        showModal={showModal}
        closeModal={closeModal}
        refetch={refetch}
      />
      <p className="text-primary-yellow text-3xl">Student Informations</p>
      <div className="w-full border-2 rounded-lg border-primary-yellow flex justify-between p-3 text-xl">
        <div>
          {/* <img src={"http://127.0.0.1:8000" + studentInfos.image_url} />
          <p>url: {studentInfos.image_url}</p> */}
        </div>
        <div>
          <p className="font-bold">
            name: {studentInfos.first_name} {studentInfos.last_name}
          </p>
          <p>phone: {studentInfos.phone}</p>
          <p>email: {studentInfos.email}</p>
        </div>
        <div>
          <p>Cycle: {studentInfos?.cycle?.name}</p>
          <p>Level: {studentInfos?.level?.name}</p>
        </div>
        <div>
          <p>
            Classes:
            {studentInfos?.subjects?.map((subject) => {
              return <p>{subject.subject_name}</p>;
            })}
          </p>
        </div>
      </div>
      <TableDetailFinance
        paymentsList={studentPayements}
        openModal={openModal}
        refetch={refetch}
      />
    </div>
  );
};

export default FinanceStudentDetail;
