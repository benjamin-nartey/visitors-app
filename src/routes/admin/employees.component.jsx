import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import axiosInstance from '../../interceptors/axios';
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
} from 'react-icons/hi2';
import Loader from '../../components/loader/loader';
import { Button, Popconfirm, message } from 'antd';
import { useAdminContext } from './context/admin.context';
import AddEmployee from '../../components/adminModals/employees/add';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setShowEmployeeAddModal,
    showEmployeeAddModal,
    showEmployeeEditModal,
    setShowEmployeeEditModal,
    setSelectedRecord,
    isAddLoading,
    setIsAddLoading,
  } = useAdminContext();

  const handleEdit = (row) => {
    setShowEmployeeEditModal(!showEmployeeAddModal);
    setSelectedRecord(row);
  };

  const handleDelete = async (id) => {
    setIsAddLoading(true);
    await axiosInstance.delete(`/visit/deleteEmployee/${id}`);
    setIsAddLoading(false);
    message.success('Employee deleted successfully');
  };
  const columns = [
    {
      Header: 'Staff',
      accessor: 'employee',
    },
    {
      Header: 'Department',
      accessor: 'Department',
    },
    {
      Header: 'Division',
      accessor: 'DDivisions',
    },
    {
      Header: 'Contact',
      accessor: 'directno',
    },
    {
      Header: 'Room No.',
      accessor: 'roomno',
    },
    {
      Header: 'Extension',
      accessor: 'extensionno',
    },

    {
      Header: 'Actions',
      accessor: (row) => {
        return (
          <div className="flex gap-2">
            <HiOutlinePencil onClick={() => handleEdit(row)} color="blue" />
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
                <HiOutlineTrash color="red" />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.get('/visit/employees');

      setEmployees(res?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading();
      console.log({ error: err.message });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [isAddLoading]);

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex justify-center mt-80">
          <Loader height={'h-10'} width={'w-10'} fillColor={'fill-black'} />
        </div>
      ) : (
        <div className="mt-20 w-[90%]">
          <Button
            className="mb-3 bg-black text-white"
            onClick={() => setShowEmployeeAddModal(!showEmployeeAddModal)}
          >
            <div className="flex">
              <span>Add</span>

              <HiOutlinePlus className="translate-y-1" />
            </div>
          </Button>
          <Table
            mockColumns={columns}
            mockData={employees}
            pagination={true}
            checkLable={'Employees'}
          />
        </div>
      )}

      {(showEmployeeAddModal || showEmployeeEditModal) && <AddEmployee />}
    </div>
  );
};

export default Employees;
