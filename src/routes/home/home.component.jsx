import React from "react";
import Logo from "../../assets/logo-cocobod.png";
import { AiOutlineSearch } from "react-icons/ai";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
import { searchClient } from "../../utils/typesenseAdapter";
import DirectoryHits from "../../components/directoryEntries/directoryHits/directoryHits";
import "../../components/search/search.css";
// import Search from "../../components/search/search.component";
import WaitingImage from "../../assets/waiting area-01@2x.png";
import { useState } from "react";
import FormFields from "../../components/formFields/formFields.component";
import { useEffect } from "react";

function Home() {
  const [isReadyData, setIsReadyData] = useState(false);
  const [hitsContent, setHitsContent] = useState(false);
  const [defaultStaffRecord, setDefaultStaffRecord] = useState(null);
  const [showDataResult, setShowDataResult] = useState(true);

  console.log(showDataResult, "uuuuuu");

  const RetrieveStaffRecord = (data1, data2) => {
    setDefaultStaffRecord(data1);
    setShowDataResult(data2);
  };

  console.log(defaultStaffRecord, "bobobob");

  const handleChange = () => {
    setHitsContent(true);
    setShowDataResult(true);
  };
  useEffect(() => {
    if (showDataResult === false) {
      setHitsContent(false);
      setIsReadyData(true);
    }
  }, [showDataResult]);
  return (
    <div className="main-body-container w-full pt-10 grid place-items-center">
      {!isReadyData && (
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
              className="semibold"
              style={{ color: "#724c2a", fontSize: "9.5px" }}
            >
              Poised to maintain Premium Quality Cocoa
            </span>
          </div>
        </div>
      )}
      <div className="search-container w-3/6 h-9 mt-4 shadow-md rounded-lg px-5 grid place-items-center">
        <div className="searchbar-container w-full h-full relative">
          <InstantSearch indexName="directory" searchClient={searchClient}>
            <div className="search-box-wrapper w-full h-full flex justify-between items-center">
              <SearchBox
                onChange={handleChange}
                className="search-box"
                translations={{ placeholder: "Search employee name..." }}
              />
              <AiOutlineSearch className="font-semibold text-lg" />
            </div>
            {hitsContent && (
              <DirectoryHits RetrieveStaffRecord={RetrieveStaffRecord} />
            )}
            {showDataResult && (
              <DirectoryHits RetrieveStaffRecord={RetrieveStaffRecord} />
            )}
          </InstantSearch>
        </div>
      </div>
      {!isReadyData && (
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
      {isReadyData && <FormFields />}
    </div>
  );
}

export default Home;
