import React, { useEffect, useState } from "react";
import DashboardImage from "../../assets/receptionist-02@2x.png";
import { BsPeople } from "react-icons/bs";
import { AuthContext } from "../../components/context/useAuth.context";
import { useContext } from "react";
import axiosInstance from "../../interceptors/axios";
import OnPremise from "../../components/on-premise/on-premise";
import Table from "../../components/Table/table";
import { CHECKINS_COLUMN } from "../../utils/checkins-column/checkins-column";
import { CHECKOUTS_COLUMN } from "../../utils/checkouts-column/checkouts-column";

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
  };

  const fetchCheckedOutToday = async () => {
    const response = await axiosInstance.get("/visit/checkoutsTodayRecords");
    setCheckedOutInToday(response.data.checkOuts);
  };

  const fetchOnPremises = async () => {
    const response = await axiosInstance.get("/visit/onPremiseTodayRecords");
    setOnPremise(response.data.checkIns);
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
      <OnPremise open={open} setOpen={setOpen} onPremise={onPremise} />
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
      <div className="checks-container w-full h-72 grid grid-cols-2 gap-4 mt-1">
        <Table
          mockData={checkedInToday}
          mockColumns={CHECKINS_COLUMN}
          checkLable={"Today's check-in"}
          checkIcon={"checkinIcon"}
        />
        <Table
          mockData={checkedOutInToday}
          mockColumns={CHECKOUTS_COLUMN}
          checkLable={"Today's check-out"}
          checkIcon={"checkoutIcon"}
        />
      </div>
    </div>
  );
}

export default Dashboard;
