import { QueryCache, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../../../utils/backend.instance";

const addPayement = async (data) => {
  return await api.post(
    "http://127.0.0.1:8000/api/v1/finance/student_payement/",
    data,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    }
  );
};
const useAddPayement = () => {
  return useMutation(
    addPayement
    //     ,{
    //     onSuccess: () => {
    //       QueryCache.invalidateQueries("student_payements");
    //     },
    //   }
  );
};

export default useAddPayement;
