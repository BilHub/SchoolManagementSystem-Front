import axios from "axios";

const getMessages = async (room_name) => {
  return await axios.get(
    `http://127.0.0.1:8000/api/v1/chat/?room_name=${room_name}`
  );
};

const chatService = { getMessages };
export default chatService;
