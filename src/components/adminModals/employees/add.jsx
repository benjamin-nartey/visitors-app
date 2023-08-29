import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { EmployeeValidationSchema } from '../../../utils/validations/employee';
import { Button, Input, InputNumber, Modal, Select, message } from 'antd';
import { useAdminContext } from '../../../routes/admin/context/admin.context';
import axiosInstance from '../../../interceptors/axios';
import { divisions } from '../../../constants/divisions';
import { departments } from '../../../constants/departments';

const AddEmployee = (setFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setShowEmployeeAddModal,
    showEmployeeAddModal,
    showEmployeeEditModal,
    isAddLoading,
    setIsAddLoading,
    selectedRecord,
    setSelectedRecord,
    setShowEmployeeEditModal,
  } = useAdminContext();

  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(EmployeeValidationSchema),
    defaultValues: {
      Department: selectedRecord ? selectedRecord.Department : '',
      DDivisions: selectedRecord ? selectedRecord.DDivisions : '',
      employee: selectedRecord ? selectedRecord.employee : '',
      roomno: selectedRecord ? selectedRecord.roomno : '',
      extensionno: selectedRecord ? selectedRecord.extensionno : '',
    },
  });

  const addEmployee = async (data) => {
    return await axiosInstance.post('/visit/addEmployee', data);
  };

  const updateEmploee = async (data) => {
    return await axiosInstance.patch(
      `/visit/updateEmployee/${selectedRecord && selectedRecord.id}`,
      data
    );
  };

  const onSubmit = async (values) => {
    console.log({ values });
    try {
      setIsLoading(true);
      setIsAddLoading(true);
      const res = selectedRecord
        ? await updateEmploee(values)
        : await addEmployee(values);

      setIsAddLoading(false);

      selectedRecord
        ? setShowEmployeeEditModal(!showEmployeeEditModal)
        : setShowEmployeeAddModal(!showEmployeeAddModal);
      message.success(
        `Successfully ${selectedRecord ? 'Updated' : 'Added'} employee`
      );
      setIsLoading(false);
      setSelectedRecord(null);
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
      setIsAddLoading(false);
    }
  };

  return (
    <div>
      <Modal
        footer={false}
        open={showEmployeeAddModal || showEmployeeEditModal}
        onCancel={() =>
          selectedRecord
            ? setShowEmployeeEditModal(!showEmployeeEditModal)
            : setShowEmployeeAddModal(!showEmployeeAddModal)
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-3"
        >
          <div>
            <label htmlFor="">Name</label>
            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter name"
                  {...field}
                  defaultValue={defaultValues.employee}
                />
              )}
            />
            {errors.employee && (
              <p className="text-xs italic text-red-500">
                {errors.employee.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Department</label>
            <Controller
              name="Department"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  placeholder="Enter name"
                  {...field}
                  options={departments}
                  defaultValue={defaultValues.Department}
                />
              )}
            />
            {errors.Department && (
              <p className="text-xs italic text-red-500">
                {errors.Department.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="">Division</label>
            <Controller
              name="DDivisions"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  placeholder="Enter name"
                  {...field}
                  options={divisions}
                  defaultValue={defaultValues.DDivisions}
                />
              )}
            />
            {errors.DDivisions && (
              <p className="text-xs italic text-red-500">
                {errors.DDivisions.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Room No.</label>
            <Controller
              name="roomno"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter name"
                  {...field}
                  defaultValue={defaultValues.roomno}
                />
              )}
            />
            {errors.roomno && (
              <p className="text-xs italic text-red-500">
                {errors.roomno.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Extension</label>
            <Controller
              name="extensionno"
              control={control}
              render={({ field }) => (
                <InputNumber
                  type="number"
                  placeholder="Enter extension number"
                  {...field}
                  className="w-full"
                  defaultValue={defaultValues.extensionno}
                />
              )}
            />
            {errors.extensionno && (
              <p className="text-xs italic text-red-500">
                {errors.extensionno.message}
              </p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="bg-black hover:bg-white hover:text-black mt-6"
            loading={isLoading}
          >
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddEmployee;
