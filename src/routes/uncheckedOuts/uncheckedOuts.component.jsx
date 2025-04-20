import React, { useEffect, useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import Loader from '../../components/loader/loader';
import { useUnCheckedOut } from '../../query-hooks/visit';
import { Input, message, Popconfirm, Table, Tooltip } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkout } from '../../http/visit';

const UncheckedOuts = () => {
  // const [uncheckedOut, setUncheckedOut] = useState([]);
  const [searchText, setSearchText] = useState('');

  // const fetchUncheckedOut = async () => {
  //   const response = await axiosInstance.get('/visit/uncheckedOutVisits');

  //   setUncheckedOut(response.data);
  // };

  // useEffect(() => {
  //   fetchUncheckedOut();
  // }, [isLoading]);
  const queryClient = useQueryClient();

  const { data: uncheckedOuts, isLoading: uncheckedOutLoading } =
    useUnCheckedOut();

  const { mutate } = useMutation({
    mutationKey: 'checkOutVisitor',
    mutationFn: (data) => checkout(data),
    onSuccess: () => {
      message.success('Visitor has been checked out!');
      queryClient.invalidateQueries({ queryKey: ['uncheckedOut'] });
    },
    onError: (err) => message.error(err.response.data.message),
  });

  const columns = [
    {
      title: "Visitor's Name",
      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record.guest_name.toLowerCase().includes(value.toLowerCase()) ||
          record.staff_name.toLowerCase().includes(value.toLowerCase()) ||
          record.purpose.toLowerCase().includes(value.toLowerCase()) ||
          record.tag.number.toLowerCase().includes(value.toLowerCase())
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
      key: 'tag.number',
    },
    {
      title: 'Action',
      dataIndex: 'tagId',
      render: (value) => (
        <Popconfirm title="Confirm check out" onConfirm={() => mutate(value)}>
          <HiCheck className=" text-green-400 text-2xl cursor-pointer" />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center mt-10 gap-6">
      <div className="flex justify-center flex-col items-center w-[20rem] mx-auto gap-2 mb-5">
        <h4 className="self-start font-semibold text-3xl">
          UncheckedOut Visits
        </h4>
        <hr className=" self-start w-[50%]  h-1 bg-black" />
      </div>
      <div className="w-[80%] mx-auto">
        <Input.Search
          className="w-full"
          placeholder="Search..."
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Table
          dataSource={
            uncheckedOuts &&
            uncheckedOuts.data.map((check) => ({
              ...check,
              key: check.id,
            }))
          }
          columns={columns}
        />
      </div>
    </div>
  );
};

export default UncheckedOuts;
