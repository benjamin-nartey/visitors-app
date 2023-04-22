import { useMemo, useRef, useState, useEffect } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { GlobalFilter } from "../../components/global-filter/global-filter";
import { FiLogIn } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";

const Table = ({ mockData, mockColumns, checkLable, checkIcon }) => {
  const [overlay, setOverlay] = useState(false);
  const [popUpRecord, setPopUpRecord] = useState(null);
  const popUpRef = useRef();

  const columns = useMemo(() => mockColumns, []); // memoize before adding to useTable hook
  const data = useMemo(() => [...mockData], [mockData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns, // useTable hook takes in memoized columns and data to be displayed
      data,
    },
    useGlobalFilter,
    useSortBy
  );

  function checksIcon() {
    if (checkIcon === "checkinIcon") {
      return <FiLogIn className="text-lg font-semibold" />;
    } else if (checkIcon === "checkoutIcon") {
      return <FiLogOut className="text-lg font-semibold" />;
    } else if (checkIcon === "onpremiseIcon") {
      return <BsPeople className="text-lg font-semibold" />;
    }
  }

  const handleClick = (row) => {
    setOverlay(true);
    setPopUpRecord(row.original);
    console.log(row.original); // Log the row data
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsidePopupRecord, true);
  }, []);

  const handleClickOutsidePopupRecord = (e) => {
    if (!popUpRef?.current?.contains(e.target)) {
      setOverlay(false);
      setPopUpRecord(null);
    }
  };

  return (
    <>
      <div className="checkin-div w-full  h-full shadow-xl round-md p-3 rounded-md overflow-hidden relative">
        {overlay && (
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.05)",
            }}
            className="over-lay absolute w-full z-10 h-full backdrop-blur-sm"
          ></div>
        )}
        {popUpRecord && (
          <div
            ref={popUpRef}
            style={{
              left: "50%",
              transform: "translate(-50%, -50%)",
              top: "45%",
              minWidth: "95%",
              fontSize: "12px",
            }}
            className="pop-up-record rounded absolute z-30 bg-white shadow-xl grid grid-cols-5 items-center p-1"
          >
            <div className="grid grid-rows-2">
              <span className="font-bold">Time in</span>
              <span>{`"${popUpRecord?.time_in}"`.match(/\d\d:\d\d/)}</span>
            </div>
            <div className="grid grid-rows-2">
              <span className="font-bold">Extension</span>
              <span>{popUpRecord?.extension}</span>
            </div>
            <div className="grid grid-rows-2">
              <span className="font-bold">Division</span>
              <span>{popUpRecord?.division}</span>
            </div>
            <div className="grid grid-rows-2">
              <span className="font-bold">Room</span>
              <span>{popUpRecord?.room_no}</span>
            </div>
            <div className="grid grid-rows-2">
              <span className="font-bold">Time Out</span>
              <span>
                {`"${popUpRecord?.time_out}"`.match(/\d\d:\d\d/) || "null"}
              </span>
            </div>
          </div>
        )}
        <div className="checkin-title-div w-full flex justify-between items-center p-2 border-solid border-b border-gray-300">
          <div className="flex justify-center items-center gap-3">
            {checksIcon()}
            <h3 className="text-lg font-semibold">{checkLable}</h3>
            <span className="text-xl font-black">( {data.length} )</span>
          </div>
          <GlobalFilter
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
        <div
          style={{ height: "14rem" }}
          className="table-div w-full relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        >
          <table {...getTableProps()}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))
                    }
                  </tr>
                ))
              }
            </thead>
            {/* Apply the table body props */}
            <tbody {...getTableBodyProps()}>
              {
                // Loop over the table rows
                rows.map((row, i) => {
                  // Prepare the row for display
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} onClick={() => handleClick(row)}>
                      {
                        // Loop over the rows cells
                        row.cells.map((cell) => {
                          // Apply the cell props
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })
                      }
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
