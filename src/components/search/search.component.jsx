import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function Search() {
  return (
    <div className="searchbar-container w-full h-full relative">
      <div className="flex justify-between items-center">
        <input
          className="focus:outline-none focus:shadow-outline w-56"
          type="text"
          placeholder="Search staff by name..."
        />
        <AiOutlineSearch className="text-xl" />
      </div>
      <div className="data-result absolute top-10 h-60 w-full rounded shadow-xl p-2 z-10 bg-white hidden">
        <div className="data-record flex justify-evenly py-1 bg-slate-100 mb-3 w-full cursor-pointer hover:bg-slate-200">
          <span className="text-sm font-semibold capitalize">
            Benjamin Nartey
          </span>
          <span className="text-sm capitalize">Information Systems Unit</span>
          <span className="text-sm uppercase">BOD</span>
          <span className="text-sm">204</span>
        </div>
        <div className="data-record flex justify-evenly py-1 bg-slate-100 mb-3 w-full cursor-pointer hover:bg-slate-200">
          <span className="text-sm font-semibold capitalize">
            Benjamin Nartey
          </span>
          <span className="text-sm capitalize">Information Systems Unit</span>
          <span className="text-sm uppercase">BOD</span>
          <span className="text-sm">204</span>
        </div>
      </div>
   
    </div>
  );
}

export default Search;
