import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import authService from "../../../services/authService";
import chatService from "../../../services/chatService";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState("");
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    authService
      .getAllUsers()
      .then((response) => {
        const data = response.data;
        const items = data.map((user) => {
          return {
            id: user.id,
            value: `${user.last_name} ${user.first_name}`,
            label: `${user.last_name} ${user.first_name}`,
            username: `${user.username}`,
          };
        });
        setUsers(items);
        console.log("users data from chat: ", users);
      })
      .catch((error) => console.log("error for getting users: ", error));
  }, []);

  const openChat = (id) => {
    // Connect to the WebSocket server with the username as a query parameter
    // const newSocket = new WebSocket(`ws://localhost:8000/ws/user_test/`);
    // const user_id = id.toString();
    const user_id = parseInt(id, 10);
    const current_userId = parseInt(user.id, 10);
    const room_name =
      user_id > current_userId
        ? `${user_id}_${current_userId}`
        : `${current_userId}_${user_id}`;

    console.log("room_name: ", room_name);
    setRoom(room_name);

    chatService.getMessages(room_name).then((response) => {
      const data = response.data.map((item) => {
        return {
          id: item.id,
          username: item.sender,
          value: item.message,
        };
      });
      setMessages(data);
    });

    const newSocket = new WebSocket(`ws://localhost:8000/ws/${room_name}/`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log("chat WebSocket connected");
    };

    newSocket.onclose = () => {
      console.log("chat WebSocket closed");
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onmessage = (e) => {
      console.log("data from onmessage: ", e);
      const data = JSON.parse(e.data);

      setMessages((prev) => [
        ...prev,
        {
          username: data.username,
          value: data.message,
        },
      ]);
    };
  };
  console.log("all messages: ", messages);

  const sendMessage = () => {
    console.log("message: ", message);
    if (socket) {
      socket.send(
        JSON.stringify({
          message: message,
          // username: selectedUser.username,
          username: user.username,
        })
      );
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log("data from sendMessage socket: ", data);
        chatService.getMessages(room).then((response) => {
          const data = response.data.map((item) => {
            return {
              id: item.id,
              username: item.sender,
              value: item.message,
            };
          });
          setMessages(data);
        });
      };

      setMessage("");
    }
  };

  return (
    <div className="grid grid-cols-3 h-[600px] ml-48 mt-10 mr-10 border-4">
      <div className="bg-gray-200">
        <div className="ml-10">
          <Select options={users} className="w-[300px]" />
          <ul>
            {users.map((user) => {
              return (
                <li
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user);
                    openChat(user.id);
                  }}
                >
                  {user.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="col-span-2 relative ">
        <p className="bg-gray-200 p-2 text-primary-green font-semibold">
          {selectedUser.label}
        </p>
        {messages.map((item, index) => {
          return (
            <div
              key={index}
              className={`p-1 m-1 rounded rounded-md
                ${
                  item.username !== selectedUser.username
                    ? "bg-primary-green max-w-[300px] text-white"
                    : "bg-gray-200 flex justify-end ml-[600px]"
                }`}
            >
              <p>{item.value}</p>
            </div>
          );
        })}
        <p className="bottom-0 w-full p-3 absolute bg-slate-200 flex items-center justify-around">
          <textarea
            onChange={(e) => {
              setMessage(e.target.value);
              console.log("message is: ", message);
            }}
            value={message}
            type="text"
            className="w-[500px] h-20 p-1 outline-none roundd rounded-md"
            wrap="hard"
          />
          <button
            onClick={sendMessage}
            className="bg-primary-green text-white rounded rounded-lg p-3"
          >
            Send
          </button>
        </p>
      </div>
    </div>
  );
};

export default Chat;
