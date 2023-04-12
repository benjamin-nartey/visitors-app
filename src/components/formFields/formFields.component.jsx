import React, { useEffect } from "react";
import FormImage from "../../assets/receptionist-02@2x.png";
import { purposeOptions } from "../../utils/purpose-of-visit-options";
import ReactSelect from "../react-select/react-select.component";
import { useState, useRef } from "react";
import axiosInstance from "../../interceptors/axios";
import { useLocalStorage } from "../../utils/useLocalStorage";

import { genderOptions } from "../../utils/genderOptions";
import swal from "sweetalert";
import SignInLoader from "../circlular-loader/circular-loader";

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
  const [accessToken, setAccessToken] = useLocalStorage("access_token", "null");
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

  // const accessToken = JSON.parse(localStorage.getItem("access_token"));
  console.log(("accessToken", accessToken));
  const {
    guest_name,
    guest_contact,
    guest_type,
    tagId,
    gender,
    purpose,
    department,
    direct_line,
    division,
    extension,
    room_no,
    staff_name,
  } = formFields;

  const clearFormFields = () => {
    setFormFields(defaultFormFields);
    setSelectedGenderValue("");
    setSelectedPurposeValue("");
    setSelectedTagValue("");
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
      const response = await axiosInstance.post("/visit/checkIn", {
        ...formFields,
      });
      console.log(response);
      setLoading(false);
      clearFormFields();
      swal("Visitor Created", "visitor details submitted", "success");
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
      clearFormFields();
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event?.target;
    setFormFields({
      ...formFields,
      department: defaultStaffRecord?.Department,
      direct_line: defaultStaffRecord?.directno,
      division: defaultStaffRecord?.DDivisions,
      extension: defaultStaffRecord?.extensionno,
      room_no: defaultStaffRecord?.roomno,
      staff_name: defaultStaffRecord?.employee,
      [name]: value,
    });
  };

  useEffect(() => {
    const getData = async () => {
      const arr = [];
      await axiosInstance.get("/tag/unIssuedTags").then((res) => {
        let result = res.data;
        console.log("Results", result);
        result.map((tag) => {
          return arr.push({ value: tag.id, label: tag.number });
        });
        setOptions(arr);
      });
    };
    getData();
  }, []);

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
    selectedGenderValue,
    selectedPurposeValue,
    selectedTagValue,
    defaultStaffRecord,
    staffRef,
    departmentRef,
    directLineRef,
    divisionRef,
    extentionRef,
    roomNoRef,
  ]);

  console.log(formFields);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-home-screen-container w-full p-6 grid grid-cols-2 gap-4 ">
        <div className="form-image-col w-full grid place-items-center">
          <img
            src={FormImage}
            alt="image"
            className="object-cover"
            style={{ height: "20rem" }}
          />
        </div>
        <div className="main-form-column w-full px-20">
          <div className="form-container flex flex-col justify-center items-center w-96">
            <div className="default-form-fields-div w-full h-48 flex justify-center items-center rounded-md shadow-md gap-3 p-3 bg-gray-200">
              <div className="left-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Staff Name</h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.employee}
                  </span> */}
                  <input
                    readOnly
                    ref={staffRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="staff_name"
                    // value={defaultStaffRecord?.employee}
                    value={staffRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Division</h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.DDivisions}
                  </span> */}
                  <input
                    readOnly
                    ref={divisionRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="division"
                    // value={defaultStaffRecord?.DDivisions}
                    value={divisionRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Direct Line</h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.directno}
                  </span> */}
                  <input
                    readOnly
                    ref={directLineRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="direct_line"
                    value={directLineRef?.current?.value}
                    // value={defaultStaffRecord?.directno}
                  />
                </div>
              </div>
              <div className="right-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Department</h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.Department}
                  </span> */}
                  <input
                    readOnly
                    ref={departmentRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="department"
                    // value={defaultStaffRecord?.Department}
                    value={departmentRef?.current?.value}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Room No.</h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.roomno}
                  </span> */}
                  <input
                    readOnly
                    ref={roomNoRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="room_no"
                    value={roomNoRef?.current?.value}
                    // value={defaultStaffRecord?.roomno}
                  />
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Extension </h4>
                  {/* <span className="text-sm capitalize">
                    {defaultStaffRecord?.extensionno}
                  </span> */}
                  <input
                    readOnly
                    ref={extentionRef}
                    className="text-sm capitalize bg-transparent focus:outline-none"
                    type="text"
                    name="extension"
                    value={extentionRef?.current?.value}
                    // value={defaultStaffRecord?.extensionno}
                  />
                </div>
              </div>
            </div>
            <div className="form-fields-div w-full grid grid-cols-2 gap-4 mt-2">
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Visitor's Name"
                name="guest_name"
                value={guest_name}
                onChange={handleChange}
                required
              />
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <ReactSelect
                  options={genderOptions}
                  placeholder="Select Gender"
                  name="gender"
                  onChange={(e) => setSelectedGenderValue(e?.value)}
                />
              </div>
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <ReactSelect
                  options={options}
                  placeholder="Select Tag"
                  name="tag_no"
                  // defaultValue={{ label: "", value: "" }}
                  onChange={(e) => setSelectedTagValue(e?.value)}
                />
              </div>

              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Visitor's Contact"
                name="guest_contact"
                value={guest_contact}
                onChange={handleChange}
                required
              />
              <input
                className="mb-3 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Company"
                name="guest_type"
                value={guest_type}
                onChange={handleChange}
                required
              />
              <div className="mb-3 shadow appearance-none border rounded w-full py-0 px-0 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                <ReactSelect
                  options={purposeOptions}
                  placeholder="Purpose"
                  name="purpose"
                  onChange={(e) => setSelectedPurposeValue(e?.value)}
                />
              </div>
            </div>
            {error && (
              <span className="mb-5 block text-red-700 text-sm font-semibold w-full">
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
