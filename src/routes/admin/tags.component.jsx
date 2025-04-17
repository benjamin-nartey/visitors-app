import { Popconfirm, Button, message } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineTrash,
} from 'react-icons/hi2';
import Table from '../../components/Table/table';
import axiosInstance from '../../interceptors/axios';
import { useAdminContext } from './context/admin.context';
import Loader from '../../components/loader/loader';
import AddTag from '../../components/adminModals/tags/add';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    setShowTagAddModal,
    showTagAddModal,
    showTagEditModal,
    setShowTagEditModal,
    isTagLoading,
    setIsTagLoading,
    setSelectedRecord,
  } = useAdminContext();

  const fetchTags = async () => {
    const res = await axiosInstance.get('/tag');

    return res?.data;
  };

  useEffect(() => {
    setIsLoading(true);
    const res = fetchTags()
      .then((res) => setTags(res))
      .finally(setIsLoading(false));

    // setIsLoading(false);
  }, [isTagLoading]);

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
      Header: 'Number',
      accessor: 'number',
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
            onClick={() => setShowTagAddModal(!showTagAddModal)}
          >
            <div className="flex">
              <span>Add</span>
              <HiOutlinePlus className="translate-y-1" />
            </div>
          </Button>
          <Table
            mockColumns={columns}
            mockData={tags}
            pagination={true}
            checkLable={'Tags'}
          />
        </div>
      )}

      {(showTagAddModal || showTagEditModal) && <AddTag />}
    </div>
  );
};

export default Tags;
