import axios from "axios";
import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import notificationService from "../../../../services/notificationService";
import NotificationItem from "./NotificationItem";

const NotificationModal = ({
  showNotification,
  notifications,
  setNotifications,
  setNumberNotifications,
}) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  // const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get the username from local storage or prompt the user to enter it
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUsername(storedUser["username"]);
    }

    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket(`ws://localhost:8000/ws/notification/`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      // Additional logic if needed
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
      // Additional logic if needed
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
      // Additional logic if needed
    };

    newSocket.onmessage = (e) => {
      let data = JSON.parse(e.data);
      notificationService.getNotifications().then((response) => {
        console.log("notificatios from backend are: ", response.data);
        const notifications = response.data;
        setNumberNotifications(notifications.length);
      });
      console.log("data from onmessage: ", data);
      // Additional logic if needed
    };

    // Clean up the WebSocket connection when the component unmounts
    // return () => {
    //   newSocket.close();
    // };
  }, [username]);

  // useEffect(() => {
  //   if (socket) {
  //     //   socket.onmessage = (event) => {
  //     //     const data = JSON.parse(event.data);
  //     //     console.log("data from event:", data);
  //     //   };
  //     socket.onmessage = () => console.log("data from event !");
  //   }
  // }, [socket]);

  useEffect(() => {
    notificationService.getNotifications().then((response) => {
      console.log("notificatios from backend are: ", response.data);
      const notifications = response.data;
      setNumberNotifications(notifications.length);
    });
  }, []);

  if (!showNotification) {
    return null;
  }

  return (
    <div className="w-[400px] absolute max-h-[600px] right-10 top-[60px] bg-gray-200 z-10 overflow-auto ">
      {notifications.map((notification) => {
        return (
          <NotificationItem
            description={notification.description}
            user={notification.user_from["username"]}
            id={notification.id}
          />
        );
      })}
    </div>
  );
};

export default NotificationModal;
