import React from "react";

const CheckoutForm = () => {
  return (
    <div
      className="w-96 h-52 rounded-md grid place-items-center bg-gray-200 absolute p-2 z-30"
      style={{ left: "50%", top: "20%", transform: "translate(-50%, -50%)" }}
    >
      <form>
        <input
          className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="checkout"
          type="text"
          placeholder="Search tags..."
          required
        />
        <button className="transition ease-linear duration-75 bg-gradient-to-r from-green-900 to-green-500 w-full hover:bg-gradient-to-r hover:from-green-500 hover:to-green-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
