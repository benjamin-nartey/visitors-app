import {
  Button,
  DatePicker,
  Dropdown,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { data } from "autoprefixer";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { BsClock } from "react-icons/bs";
import { HiLogout, HiOutlineDotsVertical } from "react-icons/hi";
import { HiMiniClock } from "react-icons/hi2";
import { useGetAllEmployees } from "../../query-hooks/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  makeAppointment,
  updateAppointment,
  update,
} from "../../http/apointment";
import dayjs from "dayjs";
import { useGetAllAppointments } from "../../query-hooks/appointment";
import { useGetUnIssuedTags } from "../../query-hooks/tags";
import { render } from "react-dom";
import { APPOINTMENT_STATUS } from "../../constants/divisions";
import { CheckOutToggleContext } from "../../components/context/checkoutToggle.context";
import { ArrowDownIcon } from "@heroicons/react/20/solid";

const Appointments = () => {
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form] = Form.useForm();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { open, setOpen } = useContext(CheckOutToggleContext);

  const [openPopConfirm, setOpenPopConfirm] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);

  // const showPopconfirm = () => {
  //   setOpenPopConfirm(true);
  // };
  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpenPopConfirm(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };
  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setOpenPopConfirm(false);
  // };
  const confirm = () => {
    setOpenPopConfirm(true);
    handleCancelAppointment({ status: "CANCELLED" });
  };

  const { data: users, isLoading } = useGetAllEmployees();

  useEffect(() => {
    if (selectedUser) {
      const user =
        users && users.data.find((user) => user.employee === selectedUser);

      form.setFieldValue("division", user?.DDivisions);
      form.setFieldValue("department", user?.Department);
      form.setFieldValue("room_no", user?.roomno);
      form.setFieldValue("extension", user?.extensionno);
    }
  }, [selectedUser]);

  const columns = [
    {
      title: "Visitor's Name",
      dataIndex: "guest_name",
      key: "guest_name",
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
      dataIndex: "guest_contact",
      key: "guest_contact",
    },
    {
      title: "Staff",
      dataIndex: "staff_name",
      key: "staff_name",
    },
    {
      title: "Staff Room No.",
      dataIndex: "room_no",
      key: "room_no",
    },
    {
      title: "Staff Extension",
      dataIndex: "extension",
      key: "extension",
    },
    {
      title: "Scheduled Time",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (value) => (
        <span>{dayjs(value).format("YYYY-MM-DD HH:mm A")}</span>
      ),
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;

        switch (status) {
          case "PENDING":
            color = "gold";
            break;
          case "IN_PROGRESS":
            color = "blue";
            break;
          case "COMPLETED":
            color = "green";
            break;
          case "CANCELLED":
            color = "red";
            break;
          default:
            color = "default";
        }

        return <Tag color={color}>{APPOINTMENT_STATUS[status]}</Tag>;
      },
    },

    {
      title: "Action",
      dataIndex: "id",

      render: (value, record) => {
        // Define items inside render so it has access to the value parameter
        const items = [
          {
            label: (
              <button
                className="w-full p-1"
                onClick={() => {
                  setShowModal(true);
                  setSelectedAppointment(value);
                }}
              >
                Start
              </button>
            ),
            key: "0",
          },
          {
            label: (
              <button
                className="w-full p-1"
                onClick={() => {
                  setIsReschedule(true);
                  setShowAppModal(true);
                }}
              >
                Reschedule
              </button>
            ),
            key: "1",
          },
          {
            type: "divider",
          },
          {
            label: (
              <button
                className="w-full p-1"
                onClick={() => setSelectedAppointment(value)}
              >
                <Popconfirm
                  title="Title"
                  description="Are you sure you want to cancel appointment?. This action cannot be undone."
                  onConfirm={confirm}
                  onOpenChange={setOpenPopConfirm}
                  okText="Continue"
                  cancelText="No"
                >
                  <span>Cancel</span>
                </Popconfirm>
              </button>
            ),
            key: "3",
          },
        ];

        return (
          <div className="flex gap-2">
            {record.status === "PENDING" && (
              <div>
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <span className="w-full" onClick={(e) => e.preventDefault()}>
                    <Space>
                      <HiOutlineDotsVertical />
                    </Space>
                  </span>
                </Dropdown>
              </div>
            )}

            {record.status === "IN_PROGRESS" && (
              <Tooltip title="CheckOut">
                <HiLogout
                  className="text-red-500"
                  size={17}
                  onClick={() => setOpen(true)}
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const queryClient = useQueryClient();

  const { data: appointments, isPending: loadingAppointments } =
    useGetAllAppointments();
  const { data: unIssuedTags, isLoading: loadingUnIssuedTags } =
    useGetUnIssuedTags();

  const { mutate: createAppointment, isPending } = useMutation({
    mutationKey: "createAppointment",
    mutationFn: (data) => {
      return makeAppointment(data);
    },
    onSuccess: () => {
      setShowAppModal(false);
      message.success("Appointment Booked Successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) =>
      message.error(
        err?.response?.data?.message || err.message || "An error occurred"
      ),
  });

  const { mutate: startAppointment, isPending: startPending } = useMutation({
    mutationKey: "updateAppointment",
    mutationFn: (data) => updateAppointment(selectedAppointment, data),
    onSuccess: () => {
      setShowModal(false);
      message.success("Appointment Started Successfully");
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (err) =>
      message.error(
        err?.response?.data?.message || err.message || "An error occurred"
      ),
  });

  const { mutate: cancelAppointmentStart, isPending: cancelPending } =
    useMutation({
      mutationKey: "cancelAppointment",
      mutationFn: (data) => update(selectedAppointment, data),
      onSuccess: () => {
        setOpenPopConfirm(false);
        message.success("Appointment Cancelled Successfully");
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
      onError: (err) =>
        message.error(
          err?.response?.data?.message || err.message || "An error occurred"
        ),
    });

  const { mutate: rescheduleAppointment, isPending: reschedulePending } =
    useMutation({
      mutationKey: "rescheduleAppointment",
      mutationFn: (data) => update(selectedAppointment, data),
      onSuccess: () => {
        setShowAppModal(false);
        message.success("Appointment Rescheduled Successfully");
        queryClient.invalidateQueries({ queryKey: ["appointments"] });
      },
      onError: (err) =>
        message.error(
          err?.response?.data?.message || err.message || "An error occurred"
        ),
    });

  const handleCancelAppointment = (values) => {
    cancelAppointmentStart(values);
  };

  const handleMakeAppointment = (values) => {
    const _values = {
      ...values,
      appointmentDate: dayjs(values["appointmentDate"]).toISOString(),
      extension: `${values["extension"]}`,
      guest_type: "Company",
    };
    createAppointment(_values);
  };

  const handleMakeReschedule = (values) => {
    const _values = {
      ...values,
      appointmentDate: dayjs(values["appointmentDate"]).toISOString(),
    };
    rescheduleAppointment(_values);
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
            <Form.Item name={"tagId"} required label="Tag">
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
        onCancel={() => {
          setIsReschedule(false);
          setShowAppModal(false);
        }}
        title="Book Appointmnet"
        footer={null}
      >
        <div className="mt-6">
          <Form
            name="appointment-form"
            layout="vertical"
            requiredMark
            form={form}
            onFinish={
              isReschedule ? handleMakeReschedule : handleMakeAppointment
            }
          >
            <Form.Item name="staff_name" label="Staff" required>
              <Select
                disabled={isReschedule}
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
              <Input
                disabled={isReschedule}
                placeholder="Enter Visitors Name...."
              />
            </Form.Item>
            <Form.Item name="guest_contact" label="Visitors Contact" required>
              <Input
                disabled={isReschedule}
                placeholder="Enter Guest Contact...."
              />
            </Form.Item>
            <Form.Item name="gender" label="Gender" required>
              <Select
                disabled={isReschedule}
                placeholder="Select Gender"
                options={[
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                ]}
              />
            </Form.Item>
            <Form.Item
              name={"appointmentDate"}
              label="Appointment Date"
              required
            >
              <DatePicker showTime className="w-full" />
            </Form.Item>
            <Form.Item name="purpose" label="Purpose">
              <TextArea
                disabled={isReschedule}
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
