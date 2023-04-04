import React from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import { UserContext } from "../context/user.context";
import { useContext } from "react";

function NavBar() {
  const [toggleLogoutBtn, setToggleLogoutBtn] = useState(false);
  const [initials, setInitials] = useState("");
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const signOut = useSignOut();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const logoutUser = () => {
    signOut();
    navigate("/");
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

  const location = useLocation();

  const getInitials = (string) => {
    return string
      .match(/(\b\S)?/g)
      .join("")
      .match(/(^\S|\S$)?/g)
      .join("");
  };

  useEffect(() => {
    if (currentUser) {
      setInitials(getInitials(currentUser?.name));
    }
  }, [currentUser]);

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
        <span className="block bg-gray-200 py-0.5 px-1 font-semibold rounded">
          {initials}
        </span>
        <span className="font-semibold">{currentUser?.name}</span>
        <span onClick={handleLogOutToggle}>
          <RiArrowDownSLine className="cursor-pointer" />
        </span>
      </div>
      {toggleLogoutBtn && (
        <button
          onClick={logoutUser}
          className="logout-div cursor-pointer absolute right-0 top-8 bg-gray-300 px-6 py-1 text-sm font-semibold"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default NavBar;
