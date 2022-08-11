import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
