import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
  Tag,
  Tooltip,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { data } from 'autoprefixer';
import React, { useContext, useEffect, useState } from 'react';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { BsClock } from 'react-icons/bs';
import { HiLogout } from 'react-icons/hi';
import { HiMiniClock } from 'react-icons/hi2';
import { useGetAllUsers } from '../../query-hooks/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { makeAppointment, updateAppointment } from '../../http/apointment';
import dayjs from 'dayjs';
import { useGetAllAppointments } from '../../query-hooks/appointment';
import { useGetUnIssuedTags } from '../../query-hooks/tags';
import { render } from 'react-dom';
import { APPOINTMENT_STATUS } from '../../constants/divisions';
import { CheckOutToggleContext } from '../../components/context/checkoutToggle.context';

const Appointments = () => {
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { open, setOpen } = useContext(CheckOutToggleContext);

  const { data: users, isLoading } = useGetAllUsers();

  useEffect(() => {
    if (selectedUser) {
      const user =
        users && users.data.find((user) => user.employee === selectedUser);

      form.setFieldValue('division', user?.DDivisions);
      form.setFieldValue('department', user?.Department);
      form.setFieldValue('room_no', user?.roomno);
      form.setFieldValue('extension', user?.extensionno);
    }
  }, [selectedUser]);

  const columns = [
    {
      title: "Visitor's Name",
      dataIndex: 'guest_name',
      key: 'guest_name',
      filteredValue: [searchText],
      onFilter: (value, record) => {
        return (
          record?.guest_name.toLowerCase().includes(value.toLowerCase()) ||
          record?.staff_name.toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: "Visitor's Contact",
      dataIndex: 'guest_contact',
      key: 'guest_contact',
    },
    {
      title: 'Staff',
      dataIndex: 'staff_name',
      key: 'staff_name',
    },
    {
      title: 'Staff Room No.',
      dataIndex: 'room_no',
      key: 'room_no',
    },
    {
      title: 'Staff Extension',
      dataIndex: 'extension',
      key: 'extension',
    },
    {
      title: 'Scheduled Time',
      dataIndex: 'appointmentDate',
      key: 'appointmentDate',
      render: (value) => (
        <span>{dayjs(value).format('YYYY-MM-DD HH:mm A')}</span>
      ),
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color;

        switch (status) {
          case 'PENDING':
            color = 'gold';
            break;
          case 'IN_PROGRESS':
            color = 'blue';
            break;
          case 'COMPLETED':
            color = 'green';
            break;
          case 'CANCELLED':
            color = 'red';
            break;
          default:
            color = 'default';
        }

        return <Tag color={color}>{APPOINTMENT_STATUS[status]}</Tag>;
      },
    },

    {
      title: 'Action',
      dataIndex: 'id',

      render: (value, record) => (
        <div className="flex gap-2">
          {record.status === 'PENDING' && (
            <div>
              <Tooltip title="CheckIn">
                <BsClock
                  className="text-green-500"
                  size={17}
                  onClick={() => {
                    setSelectedAppointment(value);
                    setShowModal(true);
                  }}
                />
              </Tooltip>
            </div>
          )}

          {record.status === 'IN_PROGRESS' && (
            <Tooltip title="CheckOut">
              <HiLogout
                className="text-red-500"
                size={17}
                onClick={() => setOpen(true)}
              />
            </Tooltip>
          )}
        </div>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      visitorsName: 'John Doe',
      visitorsContact: '0244123456',
      staff: 'Mr. Kwame Mensah',
      staffRoomNo: 'B102',
      staffExtension: '234',
      scheduledTime: '2025-04-16 10:00 AM',
      status: 'Pending',
      id: 1,
    },
    {
      key: '2',
      visitorsName: 'Ama Serwaa',
      visitorsContact: '0209876543',
      staff: 'Ms. Akua Boateng',
      staffRoomNo: 'C203',
      staffExtension: '321',
      scheduledTime: '2025-04-16 11:30 AM',
      status: 'Approved',
      id: 2,
    },
    {
      key: '3',
      visitorsName: 'Kofi Asare',
      visitorsContact: '0267894321',
      staff: 'Dr. Yaw Ofori',
      staffRoomNo: 'D401',
      staffExtension: '456',
      scheduledTime: '2025-04-17 09:00 AM',
      status: 'Completed',
      id: 3,
    },
    {
      key: '4',
      visitorsName: 'Martha Adjei',
      visitorsContact: '0501234567',
      staff: 'Mrs. Akosua Ntim',
      staffRoomNo: 'E302',
      staffExtension: '567',
      scheduledTime: '2025-04-17 02:00 PM',
      status: 'Pending',
      id: 4,
    },
    {
      key: '5',
      visitorsName: 'Daniel Owusu',
      visitorsContact: '0558765432',
      staff: 'Mr. Kojo Antwi',
      staffRoomNo: 'F105',
      staffExtension: '789',
      scheduledTime: '2025-04-18 03:45 PM',
      status: 'Cancelled',
      id: 5,
    },
    {
      key: '6',
      visitorsName: 'Linda Darko',
      visitorsContact: '0245567890',
      staff: 'Ms. Cecilia Boadu',
      staffRoomNo: 'G201',
      staffExtension: '890',
      scheduledTime: '2025-04-19 12:00 PM',
      status: 'Approved',
      id: 6,
    },
    {
      key: '7',
      visitorsName: 'Peter Mensah',
      visitorsContact: '0274432111',
      staff: 'Dr. Henry Kyei',
      staffRoomNo: 'H305',
      staffExtension: '654',
      scheduledTime: '2025-04-20 04:00 PM',
      status: 'Pending',
      id: 7,
    },
    {
      key: '8',
      visitorsName: 'Nana Ama Asiedu',
      visitorsContact: '0509988776',
      staff: 'Mr. Kwesi Agyeman',
      staffRoomNo: 'I407',
      staffExtension: '321',
      scheduledTime: '2025-04-20 10:15 AM',
      status: 'Completed',
      id: 8,
    },
    {
      key: '9',
      visitorsName: 'Yaw Dapaah',
      visitorsContact: '0234455667',
      staff: 'Ms. Efua Owusu',
      staffRoomNo: 'J509',
      staffExtension: '432',
      scheduledTime: '2025-04-21 01:00 PM',
      status: 'Approved',
      id: 9,
    },
    {
      key: '10',
      visitorsName: 'Akua Mensima',
      visitorsContact: '0543322110',
      staff: 'Dr. Nana Kumi',
      staffRoomNo: 'K601',
      staffExtension: '213',
      scheduledTime: '2025-04-22 11:00 AM',
      status: 'Cancelled',
      id: 10,
    },
    {
      key: '11',
      visitorsName: 'Isaac Addo',
      visitorsContact: '0201122334',
      staff: 'Mrs. Adjoa Sarfo',
      staffRoomNo: 'L302',
      staffExtension: '876',
      scheduledTime: '2025-04-22 03:00 PM',
      status: 'Pending',
      id: 11,
    },
    {
      key: '12',
      visitorsName: 'Abena Boateng',
      visitorsContact: '0265544332',
      staff: 'Mr. Kwaku Acheampong',
      staffRoomNo: 'M405',
      staffExtension: '109',
      scheduledTime: '2025-04-23 09:30 AM',
      status: 'Completed',
      id: 12,
    },
  ];

  const queryClient = useQueryClient();

  const { data: appointments, isPending: loadingAppointments } =
    useGetAllAppointments();
  const { data: unIssuedTags, isLoading: loadingUnIssuedTags } =
    useGetUnIssuedTags();

  const { mutate: createAppointment, isPending } = useMutation({
    mutationKey: 'createAppointment',
    mutationFn: (data) => {
      return makeAppointment(data);
    },
    onSuccess: () => {
      setShowAppModal(false);
      message.success('Appointment Booked Successfully');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) =>
      message.error(
        err?.response?.data?.message || err.message || 'An error occurred'
      ),
  });
  const { mutate: startAppointment, isPending: startPending } = useMutation({
    mutationKey: 'updateAppointment',
    mutationFn: (data) => updateAppointment(selectedAppointment, data),
    onSuccess: () => {
      setShowModal(false);
      message.success('Appointment Started Successfully');
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (err) =>
      message.error(
        err?.response?.data?.message || err.message || 'An error occurred'
      ),
  });

  const handleMakeAppointment = (values) => {
    const _values = {
      ...values,
      appointmentDate: dayjs(values['appointmentDate']).toISOString(),
      extension: `${values['extension']}`,
      guest_type: 'Company',
    };
    createAppointment(_values);
  };

  const handleStartAppointment = (values) => {
    startAppointment(values);
  };

  const _data =
    appointments &&
    appointments?.data?.map((appointment) => ({
      ...appointment,
      key: appointment.id,
    }));

  return (
    <div className="p-[4rem] ">
      <Modal
        title="CheckIn"
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className="mt-10">
          <Form
            name="tag-form"
            layout="vertical"
            onFinish={handleStartAppointment}
            requiredMark
          >
            <Form.Item name={'tagId'} required label="Tag">
              <Select
                showSearch
                optionFilterProp="label"
                placeholder="Select Tag"
                className="w-full"
                loading={loadingUnIssuedTags}
                options={
                  unIssuedTags &&
                  unIssuedTags?.data?.map((tag) => ({
                    label: tag.number,
                    value: tag.id,
                  }))
                }
              />
            </Form.Item>
            <Button className="w-full" htmlType="submit">
              CheckIn
            </Button>
          </Form>
        </div>
      </Modal>

      <Modal
        open={showAppModal}
        onCancel={() => setShowAppModal(false)}
        title="Book Appointmnet"
        footer={null}
      >
        <div className="mt-6">
          <Form
            name="appointment-form"
            layout="vertical"
            requiredMark
            form={form}
            onFinish={handleMakeAppointment}
          >
            <Form.Item name="staff_name" label="Staff" required>
              <Select
                optionFilterProp="label"
                onChange={(e) => setSelectedUser(e)}
                showSearch
                placeholder="Select Staff"
                className="w-full"
                options={
                  users &&
                  users?.data?.map((user) => ({
                    label: user.employee,
                    value: user.employee,
                  }))
                }
              />
            </Form.Item>
            <Form.Item name="division" label="Division">
              <Input disabled />
            </Form.Item>
            <Form.Item name="department" label="Department">
              <Input disabled />
            </Form.Item>
            <Form.Item name="room_no" label="Room No.">
              <Input disabled />
            </Form.Item>
            <Form.Item name="extension" label="Extension No.">
              <Input disabled />
            </Form.Item>
            <Form.Item name="guest_name" label="Visitors Name" required>
              <Input placeholder="Enter Visitors Name...." />
            </Form.Item>
            <Form.Item name="guest_contact" label="Visitors Contact" required>
              <Input placeholder="Enter Guest Contact...." />
            </Form.Item>
            <Form.Item name="gender" label="Gender" required>
              <Select
                placeholder="Select Gender"
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' },
                ]}
              />
            </Form.Item>
            <Form.Item
              name={'appointmentDate'}
              label="Appointment Date"
              required
            >
              <DatePicker className="w-full" />
            </Form.Item>
            <Form.Item name="purpose" label="Purpose">
              <TextArea
                autoSize={{ minRows: 2, maxRows: 6 }}
                placeholder="Enter purpose"
              />
            </Form.Item>

            <Button className="w-full" loading={isPending} htmlType="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold ">Appointments</h2>
      <hr className="w-[6rem] h-1 bg-black mb-7" />
      <div className="flex justify-end gap-2 mb-2">
        <Input.Search
          onChange={(e) => setSearchText(e.target.value)}
          className="w-[20rem]"
          placeholder="Search..."
        />
        <Button onClick={() => setShowAppModal(true)}>Add Appointment</Button>
      </div>
      <Table
        columns={columns}
        dataSource={_data}
        loading={loadingAppointments}
      />
    </div>
  );
};

export default Appointments;
