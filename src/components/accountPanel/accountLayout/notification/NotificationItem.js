import React from "react";
import { BsDot } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import notificationService from "../../../../services/notificationService";

const NotificationItem = ({
  id,
  description,
  user,
  setNotifications,
  setNumberNotifications,
}) => {
  const handleDeleteNotification = async () => {
    notificationService.deleteNotification(id).then((response) => {
      const data = response.data;
      setNotifications(data);
    });
  };

  return (
    <div className="w-[380px] bg-white m-auto my-2 flex items-center justify-between gap-5 px-3 relative hover:bg-gray-200">
      <div className="flex gap-3 my-1">
        <img src="" alt="img" className="bg-black rounded-full w-[50px]" />
        <div>
          <p className="text-xl">{description}</p>
          <p className="text-primary-yellow font-semibold">by: {user}</p>
        </div>
      </div>
      <button
        className="text-xl text-red-600"
        onClick={handleDeleteNotification}
      >
        <AiFillDelete />
      </button>
    </div>
  );
};

export default NotificationItem;
