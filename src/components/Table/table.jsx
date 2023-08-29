import { useMemo, useRef, useState, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { GlobalFilter } from '../../components/global-filter/global-filter';
import { FiLogIn } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';
import { BsCheckLg, BsPeople } from 'react-icons/bs';
import { Fragment } from 'react';
import {
  HiArrowPath,
  HiOutlineArrowPath,
  HiOutlineFunnel,
} from 'react-icons/hi2';
import { useReportContext } from '../../routes/reports/context/report.context';
// import { Tooltip as ReactTooltip } from "react-tooltip";

const Table = ({
  mockData,
  mockColumns,
  checkLable,
  checkIcon,
  clikableRow,
  style,
  formal,
  pagination,
  includeModal,
}) => {
  const [overlay, setOverlay] = useState(false);
  const [popUpRecord, setPopUpRecord] = useState(null);
  const popUpRef = useRef();

  const columns = useMemo(() => mockColumns, []); // memoize before adding to useTable hook
  const data = useMemo(() => [...mockData], [mockData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    rows,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter },
  } = useTable(
    {
      columns, // useTable hook takes in memoized columns and data to be displayed
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { setShowReportModal, showReportModal } = useReportContext();

  function checksIcon() {
    if (checkIcon === 'checkinIcon') {
      return <FiLogIn className="text-lg font-semibold" />;
    } else if (checkIcon === 'checkoutIcon') {
      return <FiLogOut className="text-lg font-semibold" />;
    } else if (checkIcon === 'onpremiseIcon') {
      return <BsPeople className="text-lg font-semibold" />;
    }
  }

  const handleClick = (row) => {
    setOverlay(true);
    setPopUpRecord(row.original);
    // console.log(row.original);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsidePopupRecord, true);
  }, []);

  const handleClickOutsidePopupRecord = (e) => {
    if (!popUpRef?.current?.contains(e.target)) {
      setOverlay(false);
      setPopUpRecord(null);
    }
  };
  const { pageIndex } = state;

  return (
    <>
      <div className="checkin-div w-full   shadow-xl round-md  rounded-md overflow-hidden relative">
        {overlay && (
          <div
            style={{
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
            className="over-lay absolute w-full z-10 h-full backdrop-blur-sm"
          ></div>
        )}
        {popUpRecord && (
          <div
            ref={popUpRef}
            style={{
              left: '50%',
              transform: 'translate(-50%, -50%)',
              top: '45%',
              minWidth: '95%',
              fontSize: '12px',
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
                {`"${popUpRecord?.time_out}"`.match(/\d\d:\d\d/) || 'null'}
              </span>
            </div>
          </div>
        )}
        <div className="checkin-title-div w-full flex justify-between gap-5 items-center border-solid border-b border-gray-300 px-3">
          <div className="flex justify-center items-center gap-3">
            {checksIcon()}
            <h3 className="text-lg font-semibold">{checkLable}</h3>
            <span className="text-xl font-black">( {data.length} )</span>
          </div>
          <div className="flex gap-2">
            {includeModal && (
              <div className="flex">
                {/* <HiOutlineArrowPath className="cursor-pointer" /> */}
                <HiOutlineFunnel
                  className="cursor-pointer"
                  onClick={() => setShowReportModal(!showReportModal)}
                />
              </div>
            )}
            <GlobalFilter
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        </div>
        <div
          style={style}
          className="table-div w-full relative overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] px-3"
        >
          <table {...getTableProps()} className={formal ? 'table' : ''}>
            <thead>
              {
                // Loop over the header rows
                headerGroups.map((headerGroup) => (
                  // Apply the header row props
                  <tr
                    {...headerGroup.getHeaderGroupProps()}
                    className="text text-green-700"
                  >
                    {
                      // Loop over the headers in each row
                      headerGroup.headers.map((column) => (
                        // Apply the header cell props
                        <th
                          {...column.getHeaderProps()}
                          className="text-left font-bold"
                        >
                          {column.render('Header')}
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
                pagination
                  ? page.map((row, i) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        <Fragment key={row.id}>
                          <tr
                            {...row.getRowProps()}
                            onClick={() => clikableRow && handleClick(row)}
                          >
                            {
                              // Loop over the rows cells
                              row.cells.map((cell) => {
                                // Apply the cell props
                                {
                                  /* 
                            if (cell.column.id === "additionalInfo") {
                              console.log("null");
                              return null;
                            } */
                                }

                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                  </td>
                                );
                              })
                            }
                          </tr>
                          {/* <ReactTooltip id={`row-${row.index}-tooltip`} /> */}
                        </Fragment>
                      );
                    })
                  : rows.map((row, i) => {
                      // Prepare the row for display
                      prepareRow(row);
                      return (
                        <Fragment key={row.id}>
                          <tr
                            {...row.getRowProps()}
                            onClick={() => clikableRow && handleClick(row)}
                          >
                            {
                              // Loop over the rows cells
                              row.cells.map((cell) => {
                                // Apply the cell props
                                {
                                  /* 
                            if (cell.column.id === "additionalInfo") {
                              console.log("null");
                              return null;
                            } */
                                }

                                return (
                                  <td {...cell.getCellProps()}>
                                    {cell.render('Cell')}
                                  </td>
                                );
                              })
                            }
                          </tr>
                          {/* <ReactTooltip id={`row-${row.index}-tooltip`} /> */}
                        </Fragment>
                      );
                    })
              }
            </tbody>
          </table>
        </div>
        {pagination && (
          <div className="flex justify-end gap-2 sticky bottom-0 right-0 bg-black text-white px-2 mx-0 ">
            <button
              className="text-[15px] font-bold"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              &larr; Previous
            </button>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="text-[15px] font-bold"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Table;
