import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';
import axiosInstance from '../../interceptors/axios';
import SignInLoader from '../circlular-loader/circular-loader';
import swal from 'sweetalert';

const CheckoutForm = () => {
  const [issuedTags, setIssuedTags] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [checkoutVistorRecord, setCheckoutVisitorRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const clearRecord = () => {
    setCheckoutVisitorRecord(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosInstance
        .post('/visit/checkout', {
          tagId: checkoutVistorRecord.visit[0].tagId,
        })
        .then(() => swal('Success', 'Visitor has been checked out!', 'success'))
        .then(() => setLoading(false))
        .then(() => clearRecord())
        .then(() => fetchIssuedTags());
    } catch (error) {
      setLoading(false);
      switch (error.response.data.message) {
        case 'No visit exist for the Tag Number provided':
          swal('Not found!', 'Visitor has already been checked out');
          break;
        default:
          console.log(error);
          break;
      }
      clearRecord();
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = issuedTags.filter((value) => {
      return (
        value.number.toLowerCase().includes(searchWord.trim().toLowerCase()) &&
        value.visit.length !== 0
      );
    });
    if (searchWord === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const fetchIssuedTags = async () => {
    const response = await axiosInstance.get('/tag/issuedTags');
    if (response.status === 200) {
      setIssuedTags(response.data);
    }
  };

  useEffect(() => {
    fetchIssuedTags();
  }, []);

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered('');
  };

  console.log('Record', checkoutVistorRecord);

  return (
    <div
      className="w-96 rounded-md flex flex-col justify-start px-3 py-3"
      style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
    >
      <div className="search-wrapper-checkout mb-1 bg-white shadow flex justify-between items-center w-full px-2">
        <input
          type="search"
          placeholder="Search by tag..."
          className=" appearance-none border-none bg-transparent border rounded w-80 h-10 py-2 text-gray-700 leading-tight focus:outline-none"
          value={wordEntered}
          onChange={handleFilter}
        />
        <AiOutlineSearch />
      </div>
      {filteredData.length !== 0 && (
        <div className="data-results w-full p-2 overflow-y-scroll max-h-40 bg-white shadow-md">
          {filteredData.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCheckoutVisitorRecord(data), clearInput();
                }}
                style={{ fontSize: '14px' }}
                className="record py-2 cursor-pointer hover:bg-gray-200 hover:font-semibold w-full mb-3"
              >
                <span className="w-full p-2">{data?.number}</span>
              </div>
            );
          })}
        </div>
      )}
      {checkoutVistorRecord && (
        <div className="visitor-record grid grid-cols-2 place-content-center mt-2">
          <div className="v-record-name w-full flex flex-col items-start text-sm font-semibold">
            <span>Visitor's Name</span>
            <span>Visitor's Contact</span>
            <span>Tag Number</span>
            <span>Staff's Name</span>
            <span>Department</span>
            <span>Room no.</span>
          </div>

          {checkoutVistorRecord && (
            <div className="v-record-value w-full flex flex-col items-start text-sm">
              <span>{checkoutVistorRecord?.visit[0]?.guest_name}</span>
              <span>{checkoutVistorRecord?.visit[0]?.guest_contact}</span>
              <span>{checkoutVistorRecord?.number}</span>
              <span>{checkoutVistorRecord?.visit[0]?.staff_name}</span>
              <span>{checkoutVistorRecord?.visit[0]?.department}</span>
              <span>{checkoutVistorRecord?.visit[0]?.room_no}</span>
            </div>
          )}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {!loading ? (
          <button className="transition ease-linear duration-75  w-full bg-black  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5 hover:outline-black hover:outline  hover:bg-white hover:text-black">
            Checkout
          </button>
        ) : (
          <SignInLoader loadingMessage="checking" />
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
