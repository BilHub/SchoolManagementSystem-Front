import { RiDashboardFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { BsCalendarCheck, BsChatDotsFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { HiLibrary } from "react-icons/hi";
import { MdSchedule } from "react-icons/md";

export const DashboardData = [
  {
    id: 1,
    title: "Users",
    icon: <FaUsers />,
    link: "admin_panel/users/students",
  },
  {
    id: 2,
    title: "Courses",
    icon: <GiBookCover />,
    link: "admin_panel/courses/subject",
  },
  {
    id: 3,
    title: "Attendance",
    icon: <BsCalendarCheck />,
    link: "admin_panel/attendance/students",
  },
  {
    id: 4,
    title: "Finance",
    icon: <MdAttachMoney />,
    link: "admin_panel/finance/students",
  },
  // {
  //   id: 7,
  //   title: "Library",
  //   icon: <HiLibrary />,
  //   link: "admin_panel/library",
  // },
  // {
  //   id: 8,
  //   title: "Chat",
  //   icon: <BsChatDotsFill />,
  //   link: "admin_panel/chat",
  // },
];
