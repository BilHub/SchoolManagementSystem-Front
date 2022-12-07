import { AccountSidebarData } from "../../../data/AdminPanel/AccountSidebarData";
import { GoPrimitiveDot } from "react-icons/go";
import admin1 from "../../../images/admin1.jpeg";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../../context/AdminContext";
import { useSelector } from "react-redux";

const AccountSidebar = () => {
  const { headerTitle } = useContext(AdminContext);
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="relative z-50">
      <button className="absolute -top-10 left-4 inline-flex peer text-3xl text-white">
        <GiHamburgerMenu className="block md:hidden" />
      </button>

      <div className="p-2 w-[150px] h-screen bg-primary-green fixed top-0 -left-[150px] md:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-center items-center p-2">
          <img src={admin1} width={50} className=" rounded-full" />
          <p className="text-white">{user.username}</p>
          <p className="text-primary-yellow">admin</p>
        </div>
        <ul className="text-white">
          {AccountSidebarData.map((value, key) => (
            <li key={value.id}>
              <Link
                to={user.subdomain + "/" + value.link}
                state={value.title}
                className="flex flex-row justify-center items-center p-2 cursor-pointer "
              >
                {headerTitle == value.title && (
                  <div className="text-primary-yellow">
                    <GoPrimitiveDot />
                  </div>
                )}
                <div className="w-1/5">{value.icon}</div>
                <div className="w-4/5">{value.title}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
