import React, { useEffect, useState } from 'react';

import axiosInstance from '../../interceptors/axios';
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi2';
import Loader from '../../components/loader/loader';
import { Button, Input, Popconfirm, Table, message } from 'antd';
import { useAdminContext } from './context/admin.context';
import AddEmployee from '../../components/adminModals/employees/add';
import { useGetAllEmployees } from '../../query-hooks/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteEmployee } from '../../http/user';
import { set } from 'date-fns';

const Employees = () => {
  const {
    setShowEmployeeAddModal,
    showEmployeeAddModal,
    showEmployeeEditModal,
    setShowEmployeeEditModal,
    setSelectedRecord,
    isAddLoading,
    setIsAddLoading,
  } = useAdminContext();

  const { data: employees, isLoading: loadEmployees } = useGetAllEmployees();

  const [searchText, setSearchText] = useState('');

  const qClient = useQueryClient();

  const { mutate: removeEmployee, isPending: isRemoving } = useMutation({
    mutationKey: 'removeEmployee',
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      message.success('Employee deleted successfully');
      qClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (err) => message.error(err.response.data.message),
  });

  const handleEdit = (row) => {
    setShowEmployeeEditModal(!showEmployeeAddModal);
    setSelectedRecord(row);
  };

  const handleDelete = async (id) => {
    removeEmployee(id);
  };
  const columns = [
    {
      title: 'Staff',
      dataIndex: 'employee',
      key: 'employee',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.employee.toLowerCase().includes(searchText.toLowerCase()) ||
          record?.Department.toLowerCase().includes(searchText.toLowerCase())
        );
      },
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Division',
      dataIndex: 'DDivisions',
      key: 'DDivisions',
    },
    {
      title: 'Contact',
      dataIndex: 'directno',
      key: 'directno',
    },
    {
      title: 'Room No.',
      dataIndex: 'roomno',
      key: 'roomno',
    },
    {
      title: 'Extension',
      dataIndex: 'extensionno',
      key: 'extensionno',
    },

    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      render: (_, row) => {
        return (
          <div className="flex gap-2">
            <HiOutlinePencil
              className="text-blue-500 cursor-pointer text-lg"
              onClick={() => handleEdit(row)}
              // color="blue"
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(row?.id)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: 'red' } }}
            >
              <div>
                <HiOutlineTrash className="text-red-500 cursor-pointer text-lg" />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex justify-center">
      {
        <div className="mt-10 w-[90%]">
          <div className="flex justify-end gap-3">
            <Input.Search
              className="w-[20rem]"
              placeholder="Search....."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              className=" mb-3 bg-black text-white"
              onClick={() => setShowEmployeeAddModal(!showEmployeeAddModal)}
            >
              <div className="flex">
                <span>Add</span>

                <HiOutlinePlus className="translate-y-1" />
              </div>
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={
              employees &&
              employees?.data.map((dat) => ({
                ...dat,
                key: dat?.id,
              }))
            }
            loading={loadEmployees}
          />
        </div>
      }

      {(showEmployeeAddModal || showEmployeeEditModal) && <AddEmployee />}
    </div>
  );
};

export default Employees;
