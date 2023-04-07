import React from "react";
import Sidebar from "../../components/sidebar/sidebar.component";
import NavBar from "../../components/navbar/navbar.component";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../interceptors/axios";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

function NavigationRoute() {
  const accessToken = JSON.parse(localStorage.getItem("access_token"));
  const { login, user } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      login(data);
    })();
  }, []);
  console.log(user);
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
