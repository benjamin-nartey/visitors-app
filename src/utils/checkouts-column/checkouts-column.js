import { format } from "date-fns";

export const CHECKOUTS_COLUMN = [
  {
    Header: "Visitor's Name",
    accessor: "guest_name",
  },
  {
    Header: "Staff Name",
    accessor: "staff_name",
  },
  {
    Header: " Department",
    accessor: "department",
  },
  {
    Header: " Tag",
    accessor: "room_no",
  },
  // {
  //   Header: "Time",
  //   accessor: "time_in",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "hh:mm");
  //   },
  // },
];
