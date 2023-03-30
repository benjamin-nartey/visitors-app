import React from "react";
import Logo from "../../assets/logo-cocobod.png";
import Search from "../../components/search/search.component";
import WaitingImage from "../../assets/waiting area-01@2x.png";
import { useState } from "react";
import FormFields from "../../components/formFields/formFields.component";

function Home() {
  const [isReadyData, setIsReadyData] = useState(false);
  return (
    <div className="main-body-container w-full pt-10 grid place-items-center">
      {isReadyData && (
        <div className="brand-logo-box flex justify-center items-center gap-2 mb-4">
          <div className="logo-container h-16">
            <img src={Logo} alt="cocobod logo" className="logo h-full" />
          </div>

          <div
            className="line w-px h-6"
            style={{ backgroundColor: "#724c2a" }}
          ></div>

          <div className="flex flex-col">
            <h2
              className="brand-text text-xl font-semibold "
              style={{ color: "#724c2a" }}
            >
              Ghana Cocoa Board
            </h2>
            <span
              className="font-medium"
              style={{ color: "#724c2a", fontSize: "9.3px" }}
            >
              Poised to maintain Premium Quality Cocoa
            </span>
          </div>
        </div>
      )}
      <div className="search-container w-3/6 h-9 mt-4 shadow-md rounded-lg px-5">
        <Search />
      </div>
      {isReadyData && (
        <div className="waiting-image-container w-full relative h-96 mt-16">
          <img
            src={WaitingImage}
            alt="people-waiting"
            className="absolute object-cover w-full"
            style={{
              height: "20rem",
              left: "50%",
              transform: "translate(-50%,-50%)",
              bottom: "-10rem",
            }}
          />
        </div>
      )}
      <FormFields />
    </div>
  );
}

export default Home;
