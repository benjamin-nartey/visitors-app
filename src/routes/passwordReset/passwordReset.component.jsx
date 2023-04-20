import React, { useState } from "react";
import ChangePassImg from "../../assets/change-password-svg.svg";
import axios from "axios";

const defaultEmailField = {
  email: "",
};

function PasswordReset() {
  const [emailField, setEmailField] = useState(defaultEmailField);
  const { email } = emailField;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmailField({ ...emailField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://receptionapi.cocobod.net/password/forgot",
        { ...emailField }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(emailField);

  return (
    <div className="w-screen h-screen grid place-items-center bg-white">
      <div className="reset-container grid grid-cols-2 w-3/4 bg-white h-3/4 p-3">
        <div className="pass-reset-img-conatainer w-full h-full grid place-items-center">
          <img src={ChangePassImg} alt="man-holding-key" className="w-96" />
        </div>
        <div className="form-div w-full h-full grid place-items-center">
          <form
            onSubmit={handleSubmit}
            className="w-96 h-96 bg-white rounded-md shadow-md p-5 flex flex-col justify-start items-center"
          >
            <h4 className="mb-28 text-xl font-bold">Password Reset</h4>
            <div className="forget-password-form">
              <input
                className="mb-5 shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                required
                onChange={handleChange}
              />
              <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-80  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
