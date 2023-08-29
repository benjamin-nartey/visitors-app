import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/table';
import axiosInstance from '../../interceptors/axios';

import { HiCheck } from 'react-icons/hi';
import Loader from '../../components/loader/loader';

const UncheckedOuts = () => {
  const [uncheckedOut, setUncheckedOut] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRow, setCurrentRow] = useState(-1);

  const fetchUncheckedOut = async () => {
    const response = await axiosInstance.get('/visit/uncheckedOutVisits');

    setUncheckedOut(response.data);
  };

  console.log({ 2: currentRow, 3: isLoading });

  useEffect(() => {
    fetchUncheckedOut();
  }, [isLoading]);

  const handleCheckOut = async (row) => {
    try {
      setCurrentRow(row.id);
      setIsLoading(true);

      axiosInstance
        .post('/visit/checkOut', {
          tagId: row.tag.id,
        })
        .then((willDelete) => {
          swal('Success', 'Visitor has been checked out!', 'success');
        });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

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
      Header: 'Action',
      accessor: (row) => (
        <div
          onClick={() => handleCheckOut(row)}
          className={`flex justify-center ${
            isLoading && row.id === currentRow ? ' ' : 'bg-green-300 w-[50%]'
          } px-1 py-2 rounded-sm  hover:scale-110 transition-all`}
        >
          {isLoading === true ? (
            <Loader width="w-4" height="h-4" fillColor="fill-[#6E431D]" />
          ) : (
            <HiCheck />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-center mt-10 gap-6">
      <h4 className="mx-auto font-semibold text-3xl">UncheckedOut Visits</h4>
      <div className="w-[80%] mx-auto">
        <Table
          mockData={uncheckedOut}
          mockColumns={columns}
          checkLable={'UncheckedOut Visits'}
          checkIcon={'checkoutIcon'}
          clikableRow={false}
          style={{ height: '50%' }}
        />
      </div>
    </div>
  );
};

export default UncheckedOuts;
