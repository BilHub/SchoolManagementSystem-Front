import axios from "axios";

const getNotifications = async () => {
  return await axios.get("http://127.0.0.1:8000/api/v1/notifications/");
};

const deleteNotification = async (id) => {
  return await axios.delete(`http://127.0.0.1:8000/api/v1/notifications/${id}`);
}

const notificationService = { getNotifications, deleteNotification };
export default notificationService;
