import React from "react";

function OnpremiseComponent({ onPremise }) {
  return (
    <div
      className="flex flex-col bg-white text-black p-2 rounded-sm max-h-96 overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      style={{
        // boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 24px",
        width: "100%",
      }}
    >
      <div className="grid grid-cols-5 gap-2 w-full mb-2 p-2 ">
        <span className="text-sm font-bold">Visitor's Name</span>
        <span className="text-sm font-bold">Contact</span>
        <span className="text-sm font-bold">Staff Name</span>
        <span className="text-sm font-bold">Department</span>
        <span className="text-sm font-bold">Time In</span>
      </div>
      {onPremise.map((record, index) => (
        <div
          key={index}
          className="border-b grid grid-cols-5 gap-2 w-full p-2 cursor-pointer hover:bg-gray-100"
          style={{ fontSize: "12px" }}
          
        >
          <span>{record?.guest_name}</span>
          <span>{record?.guest_contact}</span>
          <span>{record?.staff_name}</span>
          <span>{record?.department}</span>
          <span>{`"${record?.time_in}"`.match(/\d\d:\d\d/)}</span>
        </div>
      ))}
    </div>
  );
}

export default OnpremiseComponent;
