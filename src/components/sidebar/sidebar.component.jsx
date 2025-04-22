import React from "react";
import Logo from "../../assets/logo-cocobod.png";
import { MdHome } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { AiOutlineDown } from "react-icons/ai";
import {
  HiPresentationChartBar,
  HiXCircle,
  HiOutlineCog,
  HiCalendar,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { Dropdown, Space } from "antd";

import { useContext } from "react";
import { AuthContext } from "../context/useAuth.context";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { HiOutlineCalendar } from "react-icons/hi2";
import { BsCalendar } from "react-icons/bs";
import {
  RiCalendarScheduleLine,
  RiCloseLine,
  RiDashboard3Fill,
  RiDashboard3Line,
  RiHome3Line,
  RiPresentationLine,
} from "react-icons/ri";

const items = [
  {
    key: "1",
    label: (
      <NavLink className="mb-2 w-full" to="/admin/employees">
        Employees
      </NavLink>
    ),
  },
  {
    key: "2",
    label: (
      <NavLink className="mb-2 w-full" to="/admin/tags">
        Tags
      </NavLink>
    ),
  },
  {
    key: "3",
    label: (
      <NavLink className="mb-2 w-full" to="/admin/users">
        Users
      </NavLink>
    ),
  },
];

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar w-full h-full flex-col justify-center items-center">
      <div className="brand-logo-box flex justify-center items-center gap-1 mb-4 py-5 border-b border-solid border-gray-400 ">
        <div className="logo-container h-9 ">
          <img src={Logo} alt="cocobod logo" className="logo h-full" />
        </div>

        <div
          className="line w-px h-4"
          style={{ backgroundColor: "#724c2a" }}
        ></div>

        <h2
          className="brand-text text-sm font-semibold "
          style={{ color: "#724c2a" }}
        >
          Ghana Cocoa Board
        </h2>
      </div>

      <div className="navlinks-container w-full flex-col gap-y-6 flex py-5 font-bold ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex mb-2 bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold group"
              : "flex mb-2 hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group"
          }
          to="/home"
        >
          <RiHome3Line className="group-hover:fill-green-500" /> Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold group"
              : "flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group"
          }
          to="/dashboard"
        >
          <RiDashboard3Line className="group-hover:fill-green-500" /> Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold group"
              : "flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group"
          }
          to="/reports"
        >
          <RiPresentationLine className="group-hover:fill-green-500" /> Report
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold group"
              : "flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group"
          }
          to="/appointments"
        >
          <RiCalendarScheduleLine
            className="group-hover:fill-green-500"
            size={15}
          />{" "}
          Appointments
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold group"
              : "flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group"
          }
          to="/uncheckedOuts"
        >
          <RiCloseLine className="group-hover:fill-green-500" /> UncheckedOuts
        </NavLink>

        {user?.role === "ADMIN" && (
          <div className="flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium group">
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <HiOutlineCog className="group-hover:fill-green-500" />
                  Setup
                  <AiOutlineDown />
                </Space>
              </a>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
