import { RiDashboardFill } from "react-icons/ri";
import { FaUserGraduate } from "react-icons/fa";
import { ImUserTie } from "react-icons/im";
import { GiBookCover } from "react-icons/gi";
import { BsCalendarCheck, BsChatDotsFill } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import { HiLibrary } from "react-icons/hi";
import { MdSchedule } from "react-icons/md";

export const AccountSidebarData = [
  {
    title: "Dashboard",
    icon: <RiDashboardFill />,
    link: "/admin_panel",
  },
  {
    title: "Students",
    icon: <FaUserGraduate />,
    link: "/admin_panel",
  },
  {
    title: "Teachers",
    icon: <ImUserTie />,
    link: "/admin_panel",
  },
  {
    title: "Courses",
    icon: <GiBookCover />,
    link: "/admin_panel",
  },
  {
    title: "Schedule",
    icon: <MdSchedule />,
    link: "/admin_panel",
  },
  {
    title: "Attendance",
    icon: <BsCalendarCheck />,
    link: "/admin_panel",
  },
  {
    title: "Finance",
    icon: <MdAttachMoney />,
    link: "/admin_panel",
  },
  {
    title: "Library",
    icon: <HiLibrary />,
    link: "/admin_panel",
  },
  {
    title: "Chat",
    icon: <BsChatDotsFill />,
    link: "/admin_panel",
  },
];
