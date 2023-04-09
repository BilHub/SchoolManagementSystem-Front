import { useMutation } from "@tanstack/react-query";
import {api} from "../utils/backend.instance";

const deletePayement = (id) => {
  return api.delete(
    `api/v1/finance/student_payement/${id}/`
  );
};

const useDeletePayement = () => {
  return useMutation(deletePayement);
};

export default useDeletePayement;
