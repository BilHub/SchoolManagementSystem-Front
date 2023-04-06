import { IoSettingsSharp } from "react-icons/io5";
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

const AccountHeader = () => {
  const navigate = useNavigate();
  // const { headerTitle } = useContext(AdminContext);
  const location = useLocation();
  let headerTitle = location.pathname.split("/")[3];
  headerTitle = headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1);
  const dispatch = useDispatch();

  return (
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
        <IoSettingsSharp />
        <button
          onClick={() => {
            dispatch(logout());
            // dispatch(resetCycleListRedux());
            // dispatch(resetLevelListRedux());
            // dispatch(resetClassListRedux());
            navigate("/login");
          }}
        >
          <IoMdLogOut className="text-yellow-500" />
        </button>
      </div>
    </div>
  );
};

export default AccountHeader;
