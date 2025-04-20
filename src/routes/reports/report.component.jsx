import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptors/axios';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import reportVaildation from '../../utils/validations/report';
import { DatePicker, Input, Table } from 'antd';
import dayjs from 'dayjs';
import SearchModal from '../../components/search_modal/searchModal.component';
import { useReportContext } from './context/report.context';
import { useGetReport } from '../../query-hooks/visit';

const Report = () => {
  const [searchText, setSearchText] = useState('');
  // const [showModal, setshowModal] = useState(false);
  // const { setshowReportModal, showReportModal } = useReportContext();

  const { data: report, isPending } = useGetReport();

  // const fetchAllVisits = async () => {
  //   const response = await axiosInstance.get('/visit');
  //   setReportData(response.data);
  // };

  // useEffect(() => {
  //   fetchAllVisits();
  // }, []);

  const columns = [
    {
      title: "Visitor's Name",
      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record.guest_name.toLowerCase().includes(value.toLowerCase());
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
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Guest Contact',
      dataIndex: 'guest_contact',
      key: 'guest_contact',
    },
    {
      title: ' Tag',
      dataIndex: ['tag', 'number'],
    },
    {
      title: ' Day of Visit',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (row) => {
        return <span>{new Date(row).toDateString()}</span>;
      },
    },
    {
      title: ' Time In',
      dataIndex: 'time_in',
      key: 'time_in',

      render: (row) => {
        const hours = new Date(row.time_out).getHours();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        return (
          <span>{`${new Date(row).getHours()}: ${new Date(
            row
          ).getMinutes()} : ${amPM}`}</span>
        );
      },
    },
    {
      title: ' Tim Out',
      dataIndex: 'time_out',
      key: 'time_out',

      render: (row) => {
        const hours = new Date(row).getHours();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        return (
          <span>{`${new Date(row).getHours()}: ${new Date(
            row
          ).getMinutes()}  ${amPM} `}</span>
        );
      },
    },
    {
      title: 'CheckOut Date',
      dataIndex: 'time_out',
      key: 'time_out',
      render: (row) => {
        return <span>{new Date(row).toDateString()}</span>;
      },
    },
  ];

  return (
    <div className="flex  flex-col justify-center  items-center my-auto w-[40-rem]  mx-auto ">
      {/* {showReportModal && <SearchModal setterFn={setReportData} />} */}
      <div className="my-10">
        <Input.Search
          placeholder="Search..."
          className="w-full"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Table
          columns={columns}
          loading={isPending}
          dataSource={
            report &&
            report?.data.map((rep) => ({
              ...rep,
              key: rep.id,
            }))
          }
        />
      </div>
    </div>
  );
};

export default Report;
