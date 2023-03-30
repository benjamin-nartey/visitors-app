import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function NavBar({ }) {
  const [toggleLogoutBtn, setToggleLogoutBtn] = useState(false);

  const location = useLocation();
  console.log(location);


  const handleLogOutToggle = () => {
    setToggleLogoutBtn(() => !toggleLogoutBtn);
  };
  return (
    <div className="navbar w-full h-full flex justify-between items-center relative">
      <div className="home-welcome-div flex flex-col">
        <span className="block text-base text-black font-semibold">
          {location.pathname === "/home" ? "Home" : "Dashboard"}
        </span>
        <span className="block text-black text-sm">
          <span className="font-semibold">Monday</span> 27 April 2023
        </span>
      </div>
      <div className="auth-user-info flex justify-center items-center gap-2 text-base">
        <span className="block bg-gray-200 py-0.5 px-1 font-semibold rounded">
          BN
        </span>
        <span className="font-semibold">Benjamin Nartey</span>
        <span onClick={handleLogOutToggle}>
          <RiArrowDownSLine className="cursor-pointer" />
        </span>
      </div>
      {toggleLogoutBtn && (
        <div className="logout-div cursor-pointer absolute right-0 top-8 bg-gray-300 px-6 py-1 text-sm font-semibold">
          Logout
        </div>
      )}
    </div>
  );
}

export default NavBar;
