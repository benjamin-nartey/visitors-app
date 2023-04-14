import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardImage from "../../assets/receptionist-02@2x.png";
import { BsPeople } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");

  const fetchCheckedIn = async(event)=>{
    
  }

  const getFirstName = (name) => {
    const splittedName = name.split(" ");
    const stripFirstName = splittedName.shift();
    return stripFirstName;
  };

  useEffect(() => {
    if (user) {
      setFirstName(getFirstName(user.name));
    }
  }, [user]);
  return (
    <div className="dashboard-container w-full mt-24 px-6 py-4">
      <div className="flex w-full justify-evenly">
        <div className="welcome-dashboard-div shadow-lg flex justify-start items-start bg-gray-300 rounded-md p-3 relative w-3/6 h-40">
          <div className="user-info-div flex flex-col justify-center items-start">
            <h2 className="text-base font-semibold capitalize mb-2">
              Hello, {firstName}
            </h2>
            <p className="text-sm">The way to get started</p>
            <p className="text-sm">Is to quit talking, and begin doing</p>
          </div>
          <div className="dashboard-image-div ">
            <img
              className="absolute right-0 block bottom-0"
              src={DashboardImage}
              alt="dashboard-image"
              style={{ height: "15rem" }}
            />
          </div>
        </div>
        <NavLink to="">
          <div className="onPremisesCard w-72 h-40 shadow-lg bg-gray-300 rounded-md p-3">
            <div className="flex gap-6">
              <div className="icon-div p-1 bg-white rounded w-11 h-10 grid place-items-center">
                <BsPeople className="text-xl font-extrabold" />
              </div>
              <div>
                <h2 className="text-base font-semibold mb-1">
                  On Premises Visitors
                </h2>
                <p className="text-sm">Total number of visitors on premises</p>
              </div>
            </div>
            <div className="w-full mt-3 text-5xl font-semibold text-center">
              89
            </div>
          </div>
        </NavLink>
      </div>
      <div className="checks-container w-full h-72 grid grid-cols-2 gap-4 mt-6">
        <div className="checkin-div w-full  h-full shadow-xl round-md p-3 rounded-md overflow-hidden">
          <div className="checkin-title-div w-full flex justify-start items-center gap-3  p-2 border-b border-solid border-gray-300">
            <FiLogIn className="text-lg font-semibold" />
            <h3 className="text-lg font-semibold">Today's Check-in</h3>
          </div>
          <div className="checks-records h-full w-full flex flex-col">
            <div className="records-header flex flex-wrap w-full text-sm capitalize justify-evenly font-semibold py-2">
              <span>Visitor's Name</span>
              <span>Staff Name</span>
              <span>Department</span>
              <span>Room No.</span>
              <span>Time In</span>
            </div>
            <div className="record-body-container w-full h-auto py-6 flex flex-col overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Isaac Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Emannuel Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Emannuel Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-div w-full  h-full shadow-xl round-md p-3 rounded-md overflow-hidden">
          <div className="checkin-title-div w-full flex justify-start items-center gap-3  p-2 border-b border-solid border-gray-300">
            <FiLogOut className="text-lg font-semibold" />
            <h3 className="text-lg font-semibold">Today's Check-out</h3>
          </div>
          <div className="checks-records h-full w-full flex flex-col">
            <div className="records-header flex flex-wrap w-full text-sm capitalize justify-evenly font-semibold py-2">
              <span>Visitor's Name</span>
              <span>Staff Name</span>
              <span>Department</span>
              <span>Room No.</span>
              <span>Time Out</span>
            </div>
            <div className="record-body-container py-6 w-full h-auto flex flex-col overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
              <div className="records-body flex flex-wrap w-full text-xs capitalize justify-evenly py-2 hover:bg-gray-200 cursor-pointer mb-3">
                <span>Benjamin Nartey</span>
                <span>Richard Arthur</span>
                <span>Information Systems Unit</span>
                <span>201</span>
                <span>12:45pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
