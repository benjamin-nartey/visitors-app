import React from "react";

const Modal = ({ handleHideModal }) => {
  return (
    <div
      onClick={handleHideModal}
      className="modal backdrop-blur-sm z-20 relative"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
    ></div>
  );
};

export default Modal;
