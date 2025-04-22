import React, { useState } from "react";

import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi2";
import { Button, Input, Popconfirm, Table, message } from "antd";
import { useAdminContext } from "./context/admin.context";
import AddEmployee from "../../components/adminModals/employees/add";
import AddUsers from "../../components/adminModals/users/add";
import { useGetAllEmployees, useGetAllUsers } from "../../query-hooks/user";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee, deleteUser } from "../../http/user";

const Users = () => {
  const {
    showUserAddModal,
    setshowUserAddModal,
    showUserEditModal,
    setshowUserEditModal,
    setSelectedRecord,
    isAddLoading,
    setIsAddLoading,
  } = useAdminContext();

  const { data: users, isLoading: loadusers } = useGetAllUsers();

  const [searchText, setSearchText] = useState("");

  const qClient = useQueryClient();

  const { mutate: removeUser, isPending: isRemoving } = useMutation({
    mutationKey: "removeUser",
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      message.success("User deleted successfully");
      qClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => message.error(err.response.data.message),
  });

  const handleEdit = (row) => {
    setshowUserEditModal(!showUserEditModal);
    setSelectedRecord(row);
  };

  const handleDelete = async (id) => {
    removeUser(id);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          record?.email?.toLowerCase().includes(searchText.toLowerCase())
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
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
              okButtonProps={{ style: { backgroundColor: "red" } }}
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
    <div className="p-4 h-full">
      {
        <div className=" w-full h-full">
          <div className="flex justify-end gap-3">
            <Input.Search
              className="w-[20rem]"
              placeholder="Search....."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              className=" mb-3 bg-black text-white"
              onClick={() => setshowUserAddModal(!showUserAddModal)}
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
              users &&
              users?.data.map((dat) => ({
                ...dat,
                key: dat?.id,
              }))
            }
            loading={loadusers}
          />
        </div>
      }

      {(showUserAddModal || showUserEditModal) && <AddUsers />}
    </div>
  );
};

export default Users;
