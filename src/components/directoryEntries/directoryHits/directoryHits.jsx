import React, { useEffect, useState } from "react";
import { DirectoryHit } from "../directoryHit/directoryHit";
import { connectHits } from "react-instantsearch-dom";

function DirectoryHits({ hits, RetrieveStaffRecord }) {
  const [retrievedData, setRetrievedData] = useState(null);
  const [retrievedData2, setRetrievedData2] = useState(null);

  const retrieveDataFromHit = (data1, data2) => {
    setRetrievedData(data1);
    setRetrievedData2(data2);
  };

  const feedDataToParent = () => {
    RetrieveStaffRecord(retrievedData, retrievedData2);
  };

  useEffect(() => {
    feedDataToParent();
  }, [retrievedData]);

  return (
    <div className="data-result absolute top-10 max-h-60 w-full rounded shadow-xl p-2 z-10 bg-white overflow-y-scroll  ">
      {hits.map((hit, index) => (
        <DirectoryHit
          key={index}
          hit={hit}
          retrieveDataFromHit={retrieveDataFromHit}
        />
      ))}
    </div>
  );
}

export default connectHits(DirectoryHits);
