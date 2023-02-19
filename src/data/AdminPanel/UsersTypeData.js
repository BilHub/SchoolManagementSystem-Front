import { FaUserGraduate, FaUser, FaUserTie } from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";

export const UserTypeData = [
  {
    title: "Students",
    icon: <FaUserGraduate />,
    link: "/admin_panel/users/students",
  },
  {
    title: "Teachers",
    icon: <FaUser />,
    link: "/admin_panel/users/teachers",
  },
  {
    title: "Parents",
    icon: <RiParentFill />,
    link: "/admin_panel/users/parents",
  },
  {
    title: "Staff",
    icon: <FaUserTie />,
    link: "/admin_panel/users/staff",
  },
];
