import { Popconfirm, Button, message, Table, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';

import axiosInstance from '../../interceptors/axios';
import { useAdminContext } from './context/admin.context';
import Loader from '../../components/loader/loader';
import AddTag from '../../components/adminModals/tags/add';
import { useGetAllTags } from '../../query-hooks/tags';
import { set } from 'date-fns';

const Tags = () => {
  // const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const { data: tags, isLoading: loadTags } = useGetAllTags();
  const {
    setShowTagAddModal,
    showTagAddModal,
    showTagEditModal,
    setShowTagEditModal,
    isTagLoading,
    setIsTagLoading,
    setSelectedRecord,
  } = useAdminContext();

  const handleEdit = (row) => {
    setSelectedRecord(row);
    setShowTagEditModal(!showTagEditModal);
  };

  const handleDelete = async (id) => {
    setIsTagLoading(true);
    await axiosInstance.delete(`tag/${id}`);
    setIsTagLoading(false);
    message.success('Tag deleted successfully');
  };

  const columns = [
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return record.number.toLowerCase().includes(value.toLowerCase());
      },
    },

    {
      title: 'Actions',
      render: (row) => {
        return (
          <div className="flex gap-2">
            <HiOutlinePencil
              onClick={() => handleEdit(row)}
              color="blue"
              className="cursor-pointer"
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(row?.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: 'red' } }}
            >
              <div>
                <HiOutlineTrash color="red" className="cursor-pointer" />
              </div>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex justify-center">
      {isLoading ? (
        <div className="flex justify-center mt-80">
          <Loader height={'h-10'} width={'w-10'} fillColor={'fill-black'} />
        </div>
      ) : (
        <div className="mt-20 w-[90%]">
          <div className="flex justify-end">
            <Input.Search
              placeholder="Search...."
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Button
              className="mb-3 bg-black text-white"
              onClick={() => setShowTagAddModal(!showTagAddModal)}
            >
              <div className="flex">
                <span>Add</span>
                <HiOutlinePlus className="translate-y-1" />
              </div>
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={tags?.data.map((tag) => ({ key: tag.id, ...tag }))}
          />
        </div>
      )}

      {(showTagAddModal || showTagEditModal) && <AddTag />}
    </div>
  );
};

export default Tags;
