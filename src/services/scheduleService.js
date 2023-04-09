import axios from "axios";
import {api} from "../utils/backend.instance";


const getLevelEventList = (level_id) => {
  return api.get(`api/v1/schedule/?level=${level_id}`);
};

const scheduleService = { getLevelEventList };
export default scheduleService;
