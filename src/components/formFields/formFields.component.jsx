import React from "react";
import FormImage from "../../assets/receptionist-02@2x.png";
import { purposeOptions } from "../../utils/purpose-of-visit-options";

function FormFields() {
  return (
    <form>
      <div className="form-home-screen-container w-full p-6 grid grid-cols-2 gap-4">
        <div className="form-image-col w-full grid place-items-center">
          <img
            src={FormImage}
            alt="image"
            className="object-cover"
            style={{ height: "20rem" }}
          />
        </div>
        <div className="main-form-column w-full px-20">
          <div className="form-container flex flex-col justify-center items-center w-full">
            <div className="default-form-fields-div w-full h-48 flex justify-center items-center rounded-md shadow-md gap-3 p-3 bg-gray-200">
              <div className="left-left-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Staff Name</h4>
                  <span className="text-sm capitalize">Samuel Ayaa Tagoe</span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Division</h4>
                  <span className="text-sm capitalize">QCC</span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Direct Line</h4>
                  <span className="text-sm capitalize">233 450 024</span>
                </div>
              </div>
              <div className="left-left-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Department</h4>
                  <span className="text-sm capitalize">
                    Information Systems Unit
                  </span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Room No.</h4>
                  <span className="text-sm capitalize">104</span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Extension </h4>
                  <span className="text-sm capitalize">225544</span>
                </div>
              </div>
            </div>
            <div className="form-fields-div w-full grid grid-cols-2 gap-4 mt-2">
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Visitor's Name"
                required
              />
              <div className="flex justify-center mb-3 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <div className="w-full ">
                  <select
                    className="w-full text-gray-500 focus:outline-none"
                    data-te-select-placeholder="Example placeholder"
                    data-te-select-init
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="search"
                placeholder="Search tag..."
              />
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Visitor's Contact"
              />
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Company"
              />
              <div className="flex justify-center mb-3 shadow appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <div className="w-full ">
                  <select
                    className="w-full text-gray-500 focus:outline-none"
                    data-te-select-placeholder="Example placeholder"
                    data-te-select-init
                    required
                  >
                    <option value="">Purpose of visit</option>
                    {purposeOptions.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormFields;
