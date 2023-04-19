import React from "react";
import ChangePassImg from "../../assets/change-password-svg.svg";


function PasswordReset() {
  return (
    <div className="w-screen h-screen grid place-items-center bg-white">
      <div className="reset-container grid grid-cols-2 w-3/4 bg-white h-3/4 p-3">
        <div className="pass-reset-img-conatainer w-full h-full grid place-items-center">
          <img src={ChangePassImg} alt="man-holding-key" className="w-96" />
        </div>
        <div className="form-div w-full h-full grid place-items-center">
          <form className="w-96 h-96 bg-white rounded-md shadow-md p-5 flex flex-col justify-start items-center">
            <h4 className="mb-28 text-xl font-bold">Password Reset</h4>
           <div className="forget-password-form">
           <input
              className="mb-5 shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              required
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
