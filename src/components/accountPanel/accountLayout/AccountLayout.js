import React from "react";
import { Outlet } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import AccountSidebar from "./AccountSidebar";
import { AdminProvider } from "../../../context/AdminContext";

const AccountLayout = () => {
  return (
    <div>
      <AdminProvider>
        <AccountHeader />
        <AccountSidebar />
        <Outlet />
      </AdminProvider>
    </div>
  );
};

export default AccountLayout;
