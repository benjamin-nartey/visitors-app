import { format } from "date-fns";

export const CHECKINS_COLUMN = [
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
    accessor: "tag.number",
  },

  // {
  //   Header: "Custom Cell",
  //   accessor: "additionalInfo",
  //   Cell: ({ cell }) => (
  //     <span data-tip={cell.value} data-for={`row-${cell.row.index}-tooltip`}>
  //       Hover me
  //     </span>
  //   ),
  // },
  // {
  //   Header: "Time",
  //   accessor: "time_in",
  //   Cell: ({ value }) => {
  //     return format(new Date(value), "hh:mm");
  //   },
  // },
];
