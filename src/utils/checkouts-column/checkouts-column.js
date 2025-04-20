import { format } from 'date-fns';
import dayjs from 'dayjs';

export const CHECKOUTS_COLUMN = [
  {
    title: "Visitor's Name",
    dataIndex: 'guest_name',
    key: 'guest_name',
  },
  {
    title: 'Staff Name',
    dataIndex: 'staff_name',
    key: 'staff_name',
  },
  {
    title: ' Department',
    dataIndex: 'department',
    key: 'department',
  },
  {
    title: ' Tag',
    dataIndex: ['tag', 'number'],
    key: 'tag.number',
  },
  {
    title: 'Time In',
    dataIndex: 'time_in',
    render: (value) => {
      return value ? dayjs(value).format('hh:mm A') : '-';
    },
  },
  {
    title: 'Time Out',
    dataIndex: 'time_out',
    render: (value) => {
      return value ? dayjs(value).format('hh:mm A') : '-';
    },
  },
];
