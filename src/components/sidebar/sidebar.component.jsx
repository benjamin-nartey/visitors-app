import React from 'react';
import Logo from '../../assets/logo-cocobod.png';
import { MdHome } from 'react-icons/md';
import { MdDashboard } from 'react-icons/md';
import { AiOutlineDown } from 'react-icons/ai';
import {
  HiPresentationChartBar,
  HiXCircle,
  HiOutlineCog,
} from 'react-icons/hi';
import { NavLink } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '1',
    label: (
      <NavLink className="mb-2" to="/admin/employees">
        Employees
      </NavLink>
    ),
  },
  {
    key: '2',
    label: (
      <NavLink className="mb-2" to="/admin/tags">
        Tags
      </NavLink>
    ),
  },
];

function Sidebar() {
  return (
    <div className="sidebar w-full h-full flex-col justify-center items-center">
      <div className="brand-logo-box flex justify-center items-center gap-1 mb-4 py-5 border-b border-solid border-gray-400 ">
        <div className="logo-container h-9 ">
          <img src={Logo} alt="cocobod logo" className="logo h-full" />
        </div>

        <div
          className="line w-px h-4"
          style={{ backgroundColor: '#724c2a' }}
        ></div>

        <h2
          className="brand-text text-sm font-semibold "
          style={{ color: '#724c2a' }}
        >
          Ghana Cocoa Board
        </h2>
      </div>

      <div className="navlinks-container w-full flex-col gap-2 flex py-5">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'flex mb-2 bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold'
              : 'flex mb-2 hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium'
          }
          to="/home"
        >
          <MdHome /> Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold'
              : 'flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium'
          }
          to="/dashboard"
        >
          <MdDashboard /> Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold'
              : 'flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium'
          }
          to="/reports"
        >
          <HiPresentationChartBar /> Report
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'flex bg-gray-200 p-1 justify-left items-center gap-2 text-base font-semibold'
              : 'flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium'
          }
          to="/uncheckedOuts"
        >
          <HiXCircle /> UncheckedOuts
        </NavLink>

        <div className="flex hover:bg-gray-100 p-1 justify-left items-center gap-2 text-base font-medium">
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <HiOutlineCog />
                Setup
                <AiOutlineDown />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
