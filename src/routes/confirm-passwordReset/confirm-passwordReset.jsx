import ChangePassImg from "../../assets/change-password-svg.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const defaultFormFields = {
  password: "",
  confirmPassword: "",
};

function ConfirmPasswordReset() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, confirmPassword } = formFields;
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    // Do something when the query string parameters change...
    console.log(`New token: ${token}`);
    console.log(`New email: ${email}`);
  }, [token, email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = axios.post(
        "https://receptionapi.cocobod.net/password/reset",
        { ...formFields, token: token, email: email }
      );
      console.log(response);
    } catch (error) {
      // console.error(error)
      if (error.message === "Passwords do not match") {
        console.error(error);
        setErrorMessage("Error!, Passwords do not match");
      }
    }
  };

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
            <div className="forget-password-form">
              <input
                className="mb-5 shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
              />
              <input
                className="mb-3 shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                required
                onChange={handleChange}
              />
              {errorMessage && (
                <span className="text-sm text-red-800 font-bold block mb-5">
                  {errorMessage}
                </span>
              )}
              <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-80  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPasswordReset;
