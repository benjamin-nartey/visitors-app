import React, { useEffect } from "react";
import FormImage from "../../assets/receptionist-02@2x.png";
import { purposeOptions } from "../../utils/purpose-of-visit-options";
import ReactSelect from "../react-select/react-select.component";
import { useState } from "react";
import axiosInstance from "../../interceptors/axios";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie] = useCookies();
  const [options, setOptions] = useState([""]);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [selectedGenderValue, setSelectedGenderValue] = useState("");
  const [selectedTagValue, setSelectedTagValue] = useState("");
  const [selectedPurposeValue, setSelectedPurposeValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

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
    defaultStaffRecord = {};
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/visit/checkIn",
        {
          ...formFields,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        }
      );
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
      await axiosInstance
        .get("/tag/unIssuedTags", {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        })
        .then((res) => {
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
  ]);

  console.log(formFields);

  return (
    <form onSubmit={handleSubmit}>
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
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.employee}
                  </span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Division</h4>
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.DDivisions}
                  </span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Direct Line</h4>
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.directno}
                  </span>
                </div>
              </div>
              <div className="left-left-col w-full flex flex-col gap-3">
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Department</h4>
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.Department}
                  </span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Room No.</h4>
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.roomno}
                  </span>
                </div>
                <div className="staff-record-div flex flex-col">
                  <h4 className="text-base font-semibold">Extension </h4>
                  <span className="text-sm capitalize">
                    {defaultStaffRecord?.extensionno}
                  </span>
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
