// import React, { useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
// import { Hits, InstantSearch, SearchBox } from "react-instantsearch-dom";
// import { searchClient } from "../../utils/typesenseAdapter";
// import "./search.css";
// import DirectoryHits from "../directoryEntries/directoryHits/directoryHits";
// function Search() {
 
//   return (
//     <div className="searchbar-container w-full h-full relative">
//       <InstantSearch indexName="directory" searchClient={searchClient}>
//         <div className="search-box-wrapper w-full h-full flex justify-between items-center">
//           <SearchBox
//             onChange={handleChange}
//             className="search-box"
//             translations={{ placeholder: "Search employee name..." }}
//           />
//           <AiOutlineSearch className="font-semibold text-lg" />
//         </div>
//         {hitsContent && <DirectoryHits />}
//       </InstantSearch>
//     </div>
//   );
// }

// export default Search;
