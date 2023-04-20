import ChangePassImg from "../../assets/change-password-svg.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import SignInLoader from "../../components/circlular-loader/circular-loader";

const defaultFormFields = {
  password: "",
  password_confirm: "",
};

function ConfirmPasswordReset() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { password, password_confirm } = formFields;
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (password !== password_confirm) {
        throw new Error("Passwords do not match");
      }
      const response = await axios.post(
        "https://receptionapi.cocobod.net/password/reset",
        { ...formFields, token: token, email: email }
      );
      if (response.status === 200) {
        setLoading(false);
        swal("Done!", "Password has been reset successfuly", "success");
        setIsReset(true);
      }
    } catch (error) {
      setLoading(false);
      // console.error(error)
      if (error.message === "Passwords do not match") {
        console.error(error);
        setErrorMessage("Error!, Passwords do not match");
      }
    }
  };

  if (isReset) {
    navigate("/");
  }

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
                className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                onChange={handleChange}
              />
              <input
                className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password_confirm"
                type="password"
                placeholder="Confirm Password"
                name="password_confirm"
                value={password_confirm}
                required
                onChange={handleChange}
              />
              {errorMessage && (
                <span className="text-sm text-red-800 font-bold block mb-5">
                  {errorMessage}
                </span>
              )}
              {!loading ? (
                <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full  hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Reset
                </button>
              ) : (
                <SignInLoader loadingMessage="Resseting" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPasswordReset;
