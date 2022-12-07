import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { UserTypeData } from "../../../../data/AdminPanel/UsersTypeData";
const UserTypeMedium = () => {
  const location = useLocation();
  const presentLink = location.pathname;
  const { user } = useSelector((state) => state.auth);
  return (
    <div>
      <ul className="relative mr-20 my-5 ml-60  justify-between text-primary-green font-semibold italic hidden md:flex">
        {UserTypeData.map((value, index) => {
          return (
            <Link
              to={user.subdomain + value.link}
              state={"Users"}
              className={
                presentLink == user.subdomain + value.link
                  ? "text-primary-yellow"
                  : ""
              }
            >
              <li key={index} className="flex flex-col items-center text-xl">
                <div className={value.title === "Parents" ? "text-2xl" : ""}>
                  {value.icon}
                </div>
                <div>{value.title}</div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default UserTypeMedium;
