import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import NavBar from "../../components/navbar/navbar.component";
import { Outlet } from "react-router-dom";
import FormDialog from "../../components/formDialog/form-dialog";

function NavigationRoute() {
  return (
    <div className="home-container h-screen w-screen overflow-hidden grid grid-cols-12">
      <div className="sidebar-column col-span-2 shadow h-full w-full px-2">
        <div className="sidebar-container w-full h-full p-2">
          <Sidebar />
        </div>
      </div>
      <div className="main-column col-span-10 min-h-screen overflow-y-scroll">
        <div className="navbar-container w-full px-6 pt-8 sticky top-0 z-[99] bg-white">
          <NavBar />
        </div>
        <FormDialog />
        <Outlet />
      </div>
    </div>
  );
}

export default NavigationRoute;
