import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/useAuth.context";
import { useRef } from "react";
import { CheckOutToggleContext } from "../context/checkoutToggle.context";

function NavBar() {
  const [toggleLogoutBtn, setToggleLogoutBtn] = useState(false);
  const [initials, setInitials] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const logoutRef = useRef();
  const { setOpen } = useContext(CheckOutToggleContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLogut, true);
  }, []);

  const handleClickOutsideLogut = (e) => {
    if (!logoutRef?.current?.contains(e.target)) {
      setToggleLogoutBtn(false);
    }
  };

  const getCurrentDate = () => {
    const currentDay = new Date().getDay();
    const currentDate = new Date().getDate();
    setDate(currentDate);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    setYear(currentYear);
    switch (currentDay) {
      case 0:
        setDay("Sunday");
        break;

      case 1:
        setDay("Monday");
        break;

      case 2:
        setDay("Tuesday");
        break;

      case 3:
        setDay("Wednesday");
        break;

      case 4:
        setDay("Thursday");
        break;

      case 5:
        setDay("Friday");
        break;

      case 6:
        setDay("Saturday");
        break;

      default:
        console.log("error in date object");
        break;
    }

    switch (currentMonth) {
      case 0:
        setMonth("January");
        break;

      case 1:
        setMonth("February");
        break;

      case 2:
        setMonth("March");
        break;

      case 3:
        setMonth("April");
        break;

      case 4:
        setMonth("May");
        break;

      case 5:
        setMonth("June");
        break;

      case 6:
        setMonth("July");
        break;

      case 7:
        setMonth("August");
        break;

      case 8:
        setMonth("September");
        break;

      case 9:
        setMonth("October");
        break;

      case 10:
        setMonth("November");
        break;

      case 11:
        setMonth("December");
        break;

      default:
        console.log("error in date object");
        break;
    }
  };

  useEffect(() => {
    getCurrentDate();
  }, [day, date, month, year]);

  const getInitials = (string) => {
    return string
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("");
  };

  useEffect(() => {
    if (user) {
      setInitials(getInitials(user?.name));
    }
  }, [user]);

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
          <span className="font-semibold">{day}</span>{" "}
          {`${date} ${month} ${year}`}
        </span>
      </div>
      <div className="auth-user-info flex justify-center items-center gap-2 text-base">
        <button
          onClick={handleClickOpen}
          className="p-2 font-semibold text-white bg-green-600 hover:bg-green-400 hover:font-bold text-sm block mr-2 rounded"
        >
          Checkout
        </button>
        <span className="block bg-gray-200 py-0.5 px-1 font-semibold rounded">
          {initials}
        </span>
        <span className="font-semibold">{user?.name}</span>
        <span onClick={handleLogOutToggle}>
          <RiArrowDownSLine className="cursor-pointer" />
        </span>
      </div>
      {toggleLogoutBtn && (
        <button
          ref={logoutRef}
          onClick={logout}
          className="logout-div hover:bg-gray-400 hover:font-bold z-50 cursor-pointer absolute right-0 top-8 bg-gray-300 px-6 py-1 text-sm font-semibold"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default NavBar;
