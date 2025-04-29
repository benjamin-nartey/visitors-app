import React, { useEffect, useState } from 'react';
import DashboardImage from '../../assets/receptionist-02@2x.png';
import { BsPeople } from 'react-icons/bs';
import { AuthContext } from '../../components/context/useAuth.context';
import { useContext } from 'react';
import axiosInstance from '../../interceptors/axios';
import OnPremise from '../../components/on-premise/on-premise';

import {
  useFetchCheckedInToday,
  useFetchCheckedOutToday,
  useFetchOnPremises,
} from '../../query-hooks/visit';
import { Input, Table } from 'antd';
import dayjs from 'dayjs';

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState('');
  const [searchTextIn, setSearchTextIn] = useState('');
  const [searchTextOut, setSearchTextOut] = useState('');
  // const [checkedInToday, setCheckedInToday] = useState([]);
  // const [checkedOutInToday, setCheckedOutInToday] = useState([]);
  // const [onPremise, setOnPremise] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const CHECKINS_COLUMN = [
    {
      title: "Visitor's Name",

      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchTextIn],
      onFilter: (value, record) => {
        return (
          String(record.guest_name)
            .toLowerCase()
            .includes(searchTextIn.toLowerCase()) ||
          record.staff_name
            .toLowerCase()
            .includes(searchTextIn.toLowerCase()) ||
          record.tag.number
            .toLowerCase()
            .includes(searchTextIn.toLowerCase()) ||
          record.department.toLowerCase().includes(searchTextIn.toLowerCase())
        );
      },
    },
    {
      title: 'Staff Name',
      dataIndex: 'staff_name',
      key: 'staff_name',
    },
    {
      title: ' Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: ' Tag',
      dataIndex: ['tag', 'number'],
      key: 'tag.number',
    },

    // {
    //   Header: "Custom Cell",
    //   accessor: "additionalInfo",
    //   Cell: ({ cell }) => (
    //     <span data-tip={cell.value} data-for={`row-${cell.row.index}-tooltip`}>
    //       Hover me
    //     </span>
    //   ),
    // },
    {
      title: 'Time In',
      dataIndex: 'time_in',
      render: (value) => {
        return value ? dayjs(value).format('hh:mm A') : '-';
      },
    },
    {
      title: 'Time Out',
      dataIndex: 'time_out',
      render: (value) => {
        return value ? dayjs(value).format('hh:mm A') : '-';
      },
    },
  ];

  const CHECKOUTS_COLUMN = [
    {
      title: "Visitor's Name",
      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchTextOut],
      onFilter: (value, record) => {
        return (
          String(record.guest_name)
            .toLowerCase()
            .includes(searchTextOut.toLowerCase()) ||
          record.staff_name
            .toLowerCase()
            .includes(searchTextOut.toLowerCase()) ||
          record.tag.number
            .toLowerCase()
            .includes(searchTextOut.toLowerCase()) ||
          record.department.toLowerCase().includes(searchTextOut.toLowerCase())
        );
      },
    },
    {
      title: 'Staff Name',
      dataIndex: 'staff_name',
      key: 'staff_name',
    },
    {
      title: ' Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: ' Tag',
      dataIndex: ['tag', 'number'],
      key: 'tag.number',
    },
    {
      title: 'Time In',
      dataIndex: 'time_in',
      render: (value) => {
        return value ? dayjs(value).format('hh:mm A') : '-';
      },
    },
    {
      title: 'Time Out',
      dataIndex: 'time_out',
      render: (value) => {
        return value ? dayjs(value).format('hh:mm A') : '-';
      },
    },
  ];

  // const fetchCheckedInToday = async () => {
  //   const response = await axiosInstance.get('/visit/checkinsTodayRecords');
  //   setCheckedInToday(response.data.checkIns);
  // };

  // const fetchCheckedOutToday = async () => {
  //   const response = await axiosInstance.get('/visit/checkoutsTodayRecords');
  //   setCheckedOutInToday(response.data.checkOuts);
  // };

  // const fetchOnPremises = async () => {
  //   const response = await axiosInstance.get('/visit/onPremiseTodayRecords');
  //   setOnPremise(response.data.checkIns);
  // };

  const { data: checkedInToday, isPending: loadingCheckedInToday } =
    useFetchCheckedInToday();

  const { data: checkedOutToday, isPending: loadingCheckedOutToday } =
    useFetchCheckedOutToday();
  const { data: onPremiseToday, isPending: loadingPremiseToday } =
    useFetchOnPremises();

  // useEffect(() => {
  //   fetchCheckedInToday();
  //   fetchCheckedOutToday();
  //   fetchOnPremises();
  // }, []);

  const getFirstName = (name) => {
    const splittedName = name.split(' ');
    const stripFirstName = splittedName.shift();
    return stripFirstName;
  };

  useEffect(() => {
    if (user) {
      setFirstName(getFirstName(user.name));
    }
  }, [user]);
  return (
    <div className="dashboard-container w-full h-[95vh] overflow-hidden grid place-items-center px-6 py-4 ">
      <OnPremise
        open={open}
        setOpen={setOpen}
        onPremise={onPremiseToday && onPremiseToday?.data?.checkIns}
      />
      <div className="flex w-full justify-evenly mb-20">
        <div className="welcome-dashboard-div shadow-lg flex justify-start items-start bg-gray-300 rounded-md p-3 relative w-3/6 h-40 mt-20 ">
          <div className="user-info-div flex flex-col justify-center items-start">
            <h2 className="text-base font-semibold capitalize mb-2">
              Hello, {firstName}
            </h2>
            <p className="text-sm">The way to get started</p>
            <p className="text-sm">Is to quit talking, and begin doing</p>
          </div>
          <div className="dashboard-image-div ">
            <img
              className="absolute right-0 block bottom-0 "
              src={DashboardImage}
              alt="dashboard-image"
              style={{ height: '15rem' }}
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
              {onPremiseToday?.data?.checkIns.length}
            </div>
          </div>
        </button>
      </div>
      <div className="checks-container w-full grid grid-cols-2 gap-4 mt-1">
        <div className="h-full overflow-y-scroll">
          <div className="flex justify-between mb-2 ">
            <h2 className="text-base font-semibold mb-1  ">
              {`Visits (${checkedInToday?.data?.checkIns.length})`}
            </h2>
            <Input.Search
              className="w-[40%] "
              onChange={(e) => setSearchTextIn(e.target.value)}
            />
          </div>

          <Table
            scroll={{
              y: 150,
            }}
            className="h-full"
            dataSource={
              checkedInToday &&
              checkedInToday?.data?.checkIns.map((item) => ({
                ...item,
                key: item.id,
              }))
            }
            columns={CHECKINS_COLUMN}
            loading={loadingCheckedInToday}
          />
        </div>

        <div className="h-full overflow-y-scroll">
          <div className="flex justify-between mb-2 ">
            <h2 className="text-base font-semibold mb-1 flex justify-end ">
              {`Checked Outs (${checkedOutToday?.data?.checkOuts.length})`}
            </h2>
            <Input.Search
              className="w-[40%] "
              onChange={(e) => setSearchTextOut(e.target.value)}
            />
          </div>

          <Table
            scroll={{
              y: 150,
            }}
            dataSource={
              checkedOutToday &&
              checkedOutToday?.data?.checkOuts.map((item) => ({
                ...item,
                key: item.id,
              }))
            }
            columns={CHECKOUTS_COLUMN}
            loading={loadingCheckedOutToday}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
