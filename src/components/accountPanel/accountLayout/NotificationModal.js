import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const NotificationModal = ({ showNotification }) => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [notification, setNotification] = useState("");
  const [notifications, setNotifications] = useState([]);

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

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // setNotifications((prevNotifications) => [...prevNotifications, data]);
        console.log("data from event:", data);
      };
    }
  }, [socket]);

  if (!showNotification) {
    return null;
  }

  return (
    <div className="w-[400px] absolute h-screen right-10 top-[60px] bg-gray-200 z-10 ">
      NotificationModal
    </div>
  );
};

export default NotificationModal;
