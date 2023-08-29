import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptors/axios';
import Table from '../../components/Table/table';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import reportVaildation from '../../utils/validations/report';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import SearchModal from '../../components/search_modal/searchModal.component';
import { useReportContext } from './context/report.context';

const Report = () => {
  const [reportData, setReportData] = useState([]);
  // const [showModal, setshowModal] = useState(false);
  const { setshowReportModal, showReportModal } = useReportContext();

  const fetchAllVisits = async () => {
    const response = await axiosInstance.get('/visit');
    setReportData(response.data);
  };

  useEffect(() => {
    fetchAllVisits();
  }, []);

  const columns = [
    {
      Header: "Visitor's Name",
      accessor: 'guest_name',
    },
    {
      Header: 'Staff Name',
      accessor: 'staff_name',
    },
    {
      Header: ' Department',
      accessor: 'department',
    },
    {
      Header: 'Purpose',
      accessor: 'purpose',
    },
    {
      Header: 'Guest Contact',
      accessor: 'guest_contact',
    },
    {
      Header: ' Tag',
      accessor: 'tag.number',
    },
    {
      Header: ' Day of Visit',
      accessor: (row) => {
        return <span>{new Date(row.createdAt).toDateString()}</span>;
      },
    },
    {
      Header: ' Time In',
      accessor: (row) => {
        const hours = new Date(row.time_out).getHours();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        return (
          <span>{`${new Date(row.time_in).getHours()}: ${new Date(
            row.time_in
          ).getMinutes()} : ${amPM}`}</span>
        );
      },
    },
    {
      Header: ' Tim Out',
      accessor: (row) => {
        const hours = new Date(row.time_out).getHours();
        const amPM = hours >= 12 ? 'PM' : 'AM';
        return (
          <span>{`${new Date(row.time_out).getHours()}: ${new Date(
            row.time_out
          ).getMinutes()}  ${amPM} `}</span>
        );
      },
    },
    {
      Header: 'CheckOut Date',
      accessor: (row) => {
        return <span>{new Date(row.time_out).toDateString()}</span>;
      },
    },
  ];

  return (
    <div className="flex  flex-col justify-center  items-center my-auto w-[90%] mx-auto ">
      {showReportModal && <SearchModal setterFn={setReportData} />}
      <div className="my-10">
        <Table
          mockColumns={columns}
          mockData={reportData}
          checkLable={'Visits'}
          pagination={true}
          includeModal={true}
        />
      </div>
    </div>
  );
};

export default Report;
