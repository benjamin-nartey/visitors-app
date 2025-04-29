import React, { useEffect, useState } from 'react';
import axiosInstance from '../../interceptors/axios';
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Table,
  Tooltip,
} from 'antd';
import dayjs from 'dayjs';
import { BsFilter, BsFunnel } from 'react-icons/bs';
import { useMutation } from '@tanstack/react-query';
import { postReportFilters } from '../../http/report';
import { useGetReport } from '../../query-hooks/visit';
import { useReportContext } from './context/report.context';

const Report = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { setshowReportModal, showReportModal } = useReportContext();

  // Initialize with proper structure that matches your API response
  const [reportData, setReportData] = useState([]);

  const { data: report, isLoading } = useGetReport({
    enabled: true,
  });

  useEffect(() => {
    if (report && !isLoading) {
      // Make sure we're setting the data in the correct format
      setReportData(Array.isArray(report) ? report : report?.data || []);
    }
  }, [report, isLoading]);

  const columns = [
    {
      title: "Visitor's Name",
      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return String(record.guest_name || '')
          .toLowerCase()
          .includes(value.toLowerCase());
      },
    },
    {
      title: 'Staff Name',
      dataIndex: 'staff_name',
      key: 'staff_name',
    },
    {
      title: 'Department',
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
      title: 'Tag',
      dataIndex: ['tag', 'number'],
      key: 'tag',
      render: (text, record) => record.tag?.number || 'N/A',
    },
    {
      title: 'Day of Visit',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) =>
        createdAt ? new Date(createdAt).toDateString() : 'N/A',
    },
    {
      title: 'Time In',
      dataIndex: 'time_in',
      key: 'time_in',
      render: (time_in) => {
        if (!time_in) return 'N/A';

        const date = new Date(time_in);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;

        return `${displayHours}:${minutes} ${amPM}`;
      },
    },
    {
      title: 'Time Out',
      dataIndex: 'time_out',
      key: 'time_out',
      render: (time_out) => {
        if (!time_out) return 'N/A';

        const date = new Date(time_out);
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const amPM = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;

        return `${displayHours}:${minutes} ${amPM}`;
      },
    },
    {
      title: 'CheckOut Date',
      dataIndex: 'time_out',
      key: 'checkout_date',
      render: (time_out) =>
        time_out ? new Date(time_out).toDateString() : 'N/A',
    },
  ];

  const { mutate, isLoading: isFilterLoading } = useMutation({
    mutationKey: ['fetchReport'],
    mutationFn: (data) => postReportFilters(data),
    onSuccess: (response) => {
      // Handle the response consistently with our state structure

      // Extract data properly based on your API response format
      const filteredData = Array.isArray(response)
        ? response
        : Array.isArray(response.data)
        ? response.data
        : [];

      setReportData(filteredData);
      message.success('Filters applied successfully');
    },
    onError: (err) => {
      message.error(err.message || 'Failed to fetch report data');
    },
  });

  const handleSubmit = (values) => {
    console.log('Submitting filter values:', values);
    mutate({
      fromDate: dayjs(values.fromDate).toISOString(),
      toDate: dayjs(values.toDate).toISOString(),
    });
    setShowModal(false);
  };

  return (
    <div className="flex flex-col justify-center items-center my-auto w-full mx-auto">
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        title="FILTERS"
        footer={false}
      >
        <div className="mt-5">
          <Form name="reportFilter" layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="fromDate" required label="From">
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="toDate" required label="To">
              <DatePicker className="w-full" />
            </Form.Item>
            <Button
              htmlType="submit"
              className="w-full bg-green-500"
              type="primary"
            >
              Submit
            </Button>
          </Form>
        </div>
      </Modal>

      <div className="my-10 w-[90%]">
        <div className="flex justify-end gap-3 items-center mb-4 ">
          <Input.Search
            placeholder="Search..."
            className="w-[10rem]"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Tooltip title="Filter">
            <BsFunnel
              className="text-2xl text-green-500 cursor-pointer"
              onClick={() => setShowModal(true)}
            />
          </Tooltip>
        </div>

        <Table
          columns={columns}
          loading={isLoading || isFilterLoading}
          dataSource={
            Array.isArray(reportData)
              ? reportData.map((rep) => ({
                  ...rep,
                  key: rep.id || Math.random().toString(),
                }))
              : []
          }
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default Report;
