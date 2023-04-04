import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import NavBar from "../../components/navbar/navbar.component";
import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import axiosInstance from "../../interceptors/axios";
import { UserContext } from "../../components/context/user.context";

function NavigationRoute() {
  const { setCurrentUser, currentUser } = useContext(UserContext);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      setCurrentUser(data);
    })();
  }, []);
  console.log(currentUser);
  return (
    <div className="home-container h-screen w-screen overflow-hidden grid grid-cols-12">
      <div className="sidebar-column col-span-2 shadow h-full w-full px-2">
        <div className="sidebar-container w-full h-full">
          <Sidebar />
        </div>
      </div>
      <div className="main-column col-span-10 ">
        <div className="navbar-container w-full h-12 px-6 pt-8">
          <NavBar />
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default NavigationRoute;
