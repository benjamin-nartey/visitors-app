import { format } from 'date-fns';
import dayjs from 'dayjs';

export const ONPREMISE_COLUMN = [
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
    key: 'tag.number',
    dataIndex: ['tag', 'number'],
  },
  {
    title: 'Time',
    dataIndex: 'time_in',
    render: (value) => {
      return value ? dayjs(value).format('hh:mm A') : '-';
    },
  },
];
