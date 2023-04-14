import React from "react";
import { RotatingLines } from "react-loader-spinner";
const SignInLoader = ({ loadingMessage }) => (
  <div className="mt-2 flex justify-center items-center gap-3 transition ease-linear duration-75 bg-gradient-to-r from-green-500 to-green-300 w-full hover:cursor-not-allowed text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    {loadingMessage}...
    <RotatingLines
      strokeColor="grey"
      strokeWidth="5"
      animationDuration="0.75"
      width="25"
      visible={true}
    />
  </div>
);

export default SignInLoader;
