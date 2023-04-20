import React, { useState } from "react";
import ChangePassImg from "../../assets/change-password-svg.svg";
import axios from "axios";
import SignInLoader from "../../components/circlular-loader/circular-loader";

const defaultEmailField = {
  email: "",
};

function PasswordReset() {
  const [emailField, setEmailField] = useState(defaultEmailField);
  const { email } = emailField;
  const [loading, setLoading] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmailField({ ...emailField, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://receptionapi.cocobod.net/password/forgot",
        { ...emailField }
      );
      if (response.status === 200) {
        console.log(response);
        setSuccessEmail(email);
        setLoading(false);
        clearFormFields();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const clearFormFields = () => {
    setEmailField(defaultEmailField);
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
            <h4 className="mb-20 text-xl font-bold">Password Reset</h4>
            <div className="forget-password-form w-full flex flex-col">
              <input
                className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                required
                onChange={handleChange}
              />
              {successEmail && (
                <span className="mb-2 text-sm">
                  A reset token has been sent to
                  <span className="text-sm font-bold inline-block ml-1 text-green-600">
                    {successEmail}
                  </span>
                </span>
              )}
              {!loading ? (
                <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Send
                </button>
              ) : (
                <SignInLoader loadingMessage="Sending" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;
