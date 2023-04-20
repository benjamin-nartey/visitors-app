import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardImage from "../../assets/receptionist-02@2x.png";
import { BsPeople } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";
import axiosInstance from "../../interceptors/axios";
import Backdrop from "../../components/backdrop/backdrop";
import { ToggleShowPremiseContext } from "../../components/context/togleShowOnpremise.context";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [checkedInToday, setCheckedInToday] = useState([]);
  const [checkedOutInToday, setCheckedOutInToday] = useState([]);
  const [onPremise, setOnPremise] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fetchCheckedInToday = async () => {
    const response = await axiosInstance.get("/visit/checkinsTodayRecords");
    setCheckedInToday(response.data.checkIns);
    console.log(response);
  };

  const fetchCheckedOutToday = async () => {
    const response = await axiosInstance.get("/visit/checkoutsTodayRecords");
    setCheckedOutInToday(response.data.checkOuts);
    console.log(response);
  };

  const fetchOnPremises = async () => {
    const response = await axiosInstance.get("/visit/onPremiseTodayRecords");
    setOnPremise(response.data.checkIns);
    console.log(response);
  };

  useEffect(() => {
    fetchCheckedInToday();
    fetchCheckedOutToday();
    fetchOnPremises();
  }, []);

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
    <div className="dashboard-container w-full h-full grid place-items-center px-6 py-4">
      <Backdrop open={open} setOpen={setOpen} onPremise={onPremise} />
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
        <button onClick={handleClickOpen}>
          <div className="onPremisesCard w-72 h-40 shadow-lg bg-gray-300 rounded-md p-3 cursor-pointer">
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
              {onPremise.length}
            </div>
          </div>
        </button>
      </div>
      <div className="checks-container w-full h-72 grid grid-cols-2 gap-4 mt-6">
        <div className="checkin-div w-full  h-full shadow-xl round-md p-3 rounded-md overflow-hidden">
          <div className="checkin-title-div w-full flex justify-start items-center gap-3 p-2 border-solid border-gray-300">
            <FiLogIn className="text-lg font-semibold" />
            <h3 className="text-lg font-semibold">Today's Check-in </h3>
            <span className="text-xl font-black">
              ( {checkedInToday.length} )
            </span>
          </div>
          <div className="checks-records h-full w-full flex flex-col py-3">
            <div className="records-header border-t border-b p-2 mb-2 w-full text-sm capitalize grid grid-cols-5 gap-4 place-content-center font-semibold">
              <span>Name</span>
              <span>Staff Name</span>
              <span>Department</span>
              <span>Room No.</span>
              <span>Time In</span>
            </div>
            <div className="record-body-container w-full h-full py-4 flex flex-col overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {checkedInToday.map((record, index) => (
                <div
                  key={index}
                  className="records-body border-b grid grid-cols-5 w-full text-xs capitalize gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <span>{record?.guest_name}</span>
                  <span>{record?.staff_name}</span>
                  <span>{record?.department}</span>
                  <span>{record?.room_no}</span>
                  <span>{`"${record?.time_in}"`.match(/\d\d:\d\d/)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="checkout-div w-full  h-full shadow-xl round-md p-3 rounded-md overflow-hidden">
          <div className="checkin-title-div w-full flex justify-start items-center gap-3 p-2 border-solid border-gray-300">
            <FiLogOut className="text-lg font-semibold" />
            <h3 className="text-lg font-semibold">Today's Check-out</h3>
            <span className="text-xl font-black">
              ( {checkedOutInToday.length} )
            </span>
          </div>
          <div className="checks-records h-full w-full flex flex-col py-3">
            <div className="records-header border-t border-b p-2 mb-2 w-full text-sm capitalize grid grid-cols-5 gap-4 place-content-center font-semibold">
              <span>Name</span>
              <span>Staff Name</span>
              <span>Department</span>
              <span>Room No.</span>
              <span>Time Out</span>
            </div>
            <div className="record-body-container py-4 w-full h-auto flex flex-col overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              {checkedOutInToday.map((record, index) => (
                <div
                  key={index}
                  className="records-body border-b grid grid-cols-5 w-full text-xs capitalize gap-3 p-2 hover:bg-gray-200 cursor-pointer"
                >
                  <span>{record?.guest_name}</span>
                  <span>{record?.staff_name}</span>
                  <span>{record?.department}</span>
                  <span>{record?.room_no}</span>
                  <span>{`"${record?.time_out}"`.match(/\d\d:\d\d/)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
