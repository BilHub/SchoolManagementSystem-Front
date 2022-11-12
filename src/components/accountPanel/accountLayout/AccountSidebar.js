import { useState } from "react";
import { AccountSidebarData } from "../../../data/AdminPanel/AccountSidebar";
import { GoPrimitiveDot } from "react-icons/go";
import admin1 from "../../../images/admin1.jpeg";
import { GiHamburgerMenu } from "react-icons/gi";

const AccountSidebar = () => {
  const [activeKey, setActiveKey] = useState("");

  return (
    <div>
      <button className="absolute top-4 right-4 inline-flex peer">
        <GiHamburgerMenu className="block md:hidden" />
      </button>

      <div className="p-2 w-[150px] h-screen bg-primary-green fixed top-0 -left-[150px] lg:left-0 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
        <div className="flex flex-col justify-center items-center p-2">
          <img src={admin1} width={80} className=" rounded-full" />
          <p className="text-white">username</p>
          <p className="text-primary-yellow">admin</p>
        </div>
        <ul className="text-white">
          {AccountSidebarData.map((value, key) => (
            <li
              className="flex flex-row justify-center items-center p-2"
              key={key}
              onClick={() => {
                // window.location.pathname = value.link;
                setActiveKey(key);
              }}
            >
              {activeKey == key && (
                <div className="text-primary-yellow">
                  <GoPrimitiveDot />
                </div>
              )}
              <div className="w-1/5">{value.icon}</div>
              <div className="w-4/5">{value.title}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
