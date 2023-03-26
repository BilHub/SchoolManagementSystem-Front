import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const deletePayement = (id) => {
  return axios.delete(
    `http://127.0.0.1:8000/api/v1/finance/student_payement/${id}/`
  );
};

const useDeletePayement = () => {
  return useMutation(deletePayement);
};

export default useDeletePayement;
