import React from "react";
import Navbar from "../Navbar";
import { Outlet, useLocation } from "react-router-dom";
import SubNav from "../SubNav";

const AppLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      {pathname === "/categories" && <SubNav />}
      <Outlet />
    </>
  );
};

export default AppLayout;
