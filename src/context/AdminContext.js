import { createContext } from "react";
import { useLocation } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const location = useLocation();
  // if (location.state === "") {
  //   location.state = "Dashboard";
  // }
  // const headerTitle = location.state;
  const headerTitle = location.state ? location.state : "Dashboard";

  return (
    <AdminContext.Provider value={{ headerTitle }}>
      {children}
    </AdminContext.Provider>
  );
};
