import axios from "axios";
import {api, setAuthToken} from "../utils/backend.instance";

const getNotifications = async () => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    return await api.get("/api/v1/notifications/");
};

const deleteNotification = async (id) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    return await api.delete(`/api/v1/notifications/${id}`);
}

const notificationService = {getNotifications, deleteNotification};
export default notificationService;
