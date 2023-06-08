import { IoSettingsSharp, IoNotificationsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
// import { AdminContext } from "../../../context/AdminContext";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  resetClassListRedux,
  resetCycleListRedux,
  resetLevelListRedux,
} from "../../../redux/courseSlice";
import NotificationModal from "./notification/NotificationModal";
import { useEffect, useState } from "react";
import notificationService from "../../../services/notificationService";

const AccountHeader = () => {
  const navigate = useNavigate();
  // const { headerTitle } = useContext(AdminContext);
  const location = useLocation();
  let headerTitle = location.pathname.split("/")[3];
  headerTitle = headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1);
  const dispatch = useDispatch();
  const [showNotification, setShowNotification] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [numberNotifications, setNumberNotifications] = useState("");

  const handleNotificationModal = () => {
    setShowNotification((prev) => !prev);
    notificationService.getNotifications().then((response) => {
      setNotifications(response.data);
      setNumberNotifications(response.data.length);
    });
  };

  return (
    <div className="relative">
      <NotificationModal
        showNotification={showNotification}
        notifications={notifications}
        setNotifications={setNotifications}
        setNumberNotifications={setNumberNotifications}
      />
      <div className="h-[50px] w-screen bg-primary-green flex justify-between px-5 text-white">
        {headerTitle ? (
          <p className="flex ml-10 md:ml-36 items-center text-3xl font-semibold italic">
            {headerTitle}
          </p>
        ) : (
          <p className="flex ml-44 items-center text-2xl font-semibold italic">
            Dashboard
          </p>
        )}

        <div className="flex justify-center items-center text-3xl gap-3">
          <button
            className="relative mr-3"
            // onClick={() => setShowNotification((prev) => !prev)}
            onClick={handleNotificationModal}
          >
            <p className="bg-primary-yellow rounded rounded-full absolute -right-3 text-lg w-6 h-6 -top-1">
              {numberNotifications}
            </p>
            <IoNotificationsSharp className="hover:text-primary-yellow " />
          </button>
          <button className="hover:text-primary-yellow">
            <IoSettingsSharp />
          </button>
          <button
            onClick={() => {
              dispatch(logout());
              navigate("/login");
            }}
          >
            <IoMdLogOut className="text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
