import React, { useEffect } from "react";
import FormImage from "../../assets/receptionist-02@2x.png";
import { purposeOptions } from "../../utils/purpose-of-visit-options";
import { useState, useRef } from "react";
import axiosInstance from "../../interceptors/axios";
import { genderOptions } from "../../utils/genderOptions";
import swal from "sweetalert";
import SignInLoader from "../circlular-loader/circular-loader";
import SelectComponent from "../Select/select-component";

const defaultFormFields = {
  guest_name: "",
  guest_contact: "",
  guest_type: "",
  tagId: "",
  gender: "",
  purpose: "",
  department: "",
  direct_line: "",
  division: "",
  extension: "",
  room_no: "",
  staff_name: "",
};

function FormFields({ defaultStaffRecord }) {
  const [options, setOptions] = useState([""]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [selectedGenderValue, setSelectedGenderValue] = useState("");
  const [selectedTagValue, setSelectedTagValue] = useState("");
  const [selectedPurposeValue, setSelectedPurposeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const staffRef = useRef("");
  const departmentRef = useRef("");
  const divisionRef = useRef("");
  const roomNoRef = useRef("");
  const extentionRef = useRef("");
  const directLineRef = useRef("");

  const { guest_name, guest_contact, guest_type } = formFields;

  const clearAllSelectValue = () => {
    setSelectedGenderValue("");
    setSelectedPurposeValue("");
    setSelectedTagValue("");
  };

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
    clearAllSelectValue();
    staffRef.current.value = "";
    departmentRef.current.value = "";
    directLineRef.current.value = "";
    divisionRef.current.value = "";
    extentionRef.current.value = "";
    roomNoRef.current.value = "";
  };

  const fillDefaultRecords = () => {
    staffRef.current.value = defaultStaffRecord?.employee;
    departmentRef.current.value = defaultStaffRecord?.Department;
    directLineRef.current.value = defaultStaffRecord?.directno;
    divisionRef.current.value = defaultStaffRecord?.DDivisions;
    extentionRef.current.value = defaultStaffRecord?.extensionno;
    roomNoRef.current.value = defaultStaffRecord?.roomno;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await axiosInstance
        .post("/visit/checkIn", {
          ...formFields,
        })
        .then(() => setLoading(false))
        .then(() => getData())
        .then(() => swal("Success", "visitor details submitted", "success"))
        .then(() => clearFormFields())
        .then(() => {
          if (error) {
            setError(false);
          }
        })
        .finally(() => event.target.reset());
    } catch (error) {
      setError(true);
      setLoading(false);
      switch (error.message) {
        case "Request failed with status code 400":
          setErrorMessage("Error!, make sure delicate fields are not empty!");
          break;
        default:
          setErrorMessage("error sending request...");
          break;
      }
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormFields({
      ...formFields,
      department: departmentRef?.current?.value,
      direct_line: directLineRef?.current?.value,
      division: divisionRef?.current?.value,
      extension: extentionRef?.current?.value,
      room_no: roomNoRef.current?.value,
      staff_name: staffRef?.current?.value,
      [name]: value,
    });
  };

  const getData = async () => {
    const arr = [];
    await axiosInstance.get("/tag/unIssuedTags").then((res) => {
      let result = res.data;
      result.map((tag) => {
        return arr.push({ value: tag.id, label: tag.number });
      });
      setOptions(arr);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setFormFields({
      ...formFields,
      tagId: selectedTagValue,
      gender: selectedGenderValue,
      purpose: selectedPurposeValue,
    });
  }, [selectedGenderValue, selectedPurposeValue, selectedTagValue]);

  useEffect(() => {
    fillDefaultRecords();
    setFormFields({
      ...formFields,
      tagId: selectedTagValue,
      gender: selectedGenderValue,
      purpose: selectedPurposeValue,
      department: defaultStaffRecord?.Department,
      direct_line: defaultStaffRecord?.directno,
      division: defaultStaffRecord?.DDivisions,
      extension: defaultStaffRecord?.extensionno,
      room_no: defaultStaffRecord?.roomno,
      staff_name: defaultStaffRecord?.employee,
    });
  }, [
    defaultStaffRecord,
    staffRef,
    departmentRef,
    directLineRef,
    divisionRef,
    extentionRef,
    roomNoRef,
  ]);

  return (
    <form className=" h-full" onSubmit={handleSubmit}>
      <div className="form-home-screen-container w-full px-6 grid grid-cols-2 gap-4 ">
        <div className="form-image-col w-full grid place-items-center">
          <img
            src={FormImage}
            alt="image"
            className="object-cover"
            style={{ height: "20rem" }}
          />
        </div>
        <div className="main-form-column w-full h-full px-20">
          <div className="form-container flex flex-col justify-center items-center w-96">
            <div className="default-form-fields-div w-full h-48 flex justify-center items-center rounded-md shadow-md gap-3 p-3 bg-gray-200">
              <div className="left-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Staff Name</h4>

                  <input
                    readOnly
                    ref={staffRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="staff_name"
                    value={staffRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Division</h4>
                  <input
                    readOnly
                    ref={divisionRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="division"
                    value={divisionRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Direct Line</h4>
                  <input
                    readOnly
                    ref={directLineRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="direct_line"
                    value={directLineRef?.current?.value}
                  />
                </div>
              </div>
              <div className="right-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Department</h4>
                  <input
                    readOnly
                    ref={departmentRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="department"
                    value={departmentRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Room No.</h4>
                  <input
                    readOnly
                    ref={roomNoRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="room_no"
                    value={roomNoRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Extension </h4>
                  <input
                    readOnly
                    ref={extentionRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="extension"
                    value={extentionRef?.current?.value}
                  />
                </div>
              </div>
            </div>
            <div className="form-fields-div w-full grid grid-cols-2 gap-4 mt-2">
              <input
                className="mb-3 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Visitor's Name"
                name="guest_name"
                value={guest_name}
                onChange={handleChange}
                required
              />
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <SelectComponent
                  placeholder="Select Gender"
                  nothingFound="nothing found"
                  value={selectedGenderValue}
                  onChange={setSelectedGenderValue}
                  data={genderOptions}
                />
              </div>
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <SelectComponent
                  placeholder="Select Tag"
                  nothingFound="nothing found"
                  value={selectedTagValue}
                  onChange={setSelectedTagValue}
                  data={options}
                />
              </div>

              <input
                className="mb-3 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                pattern="(02|05|)\d{8}"
                maxLength={10}
                minLength={10}
                placeholder="Visitor's Contact"
                name="guest_contact"
                value={guest_contact}
                onChange={handleChange}
                required
              />
              <input
                className="mb-3 text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Company"
                name="guest_type"
                value={guest_type}
                onChange={handleChange}
                required
              />
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <SelectComponent
                  placeholder="Select Purpose"
                  nothingFound="nothing found"
                  value={selectedPurposeValue}
                  onChange={setSelectedPurposeValue}
                  data={purposeOptions}
                />
              </div>
            </div>
            {error && (
              <span className="mb-1 block text-red-700 text-sm font-semibold w-full">
                {errorMessage}
              </span>
            )}
            {loading ? (
              <SignInLoader loadingMessage="Creating" />
            ) : (
              <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormFields;
