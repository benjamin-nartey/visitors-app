import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { UsersValidationSchema } from '../../../utils/validations/users';
import { Button, Input, InputNumber, Modal, Select, message } from 'antd';
import { useAdminContext } from '../../../routes/admin/context/admin.context';
import axiosInstance from '../../../interceptors/axios';
import { roles } from '../../../constants/roles';

const AddUsers = (setFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    showUserAddModal,
    setshowUserAddModal,
    showUserEditModal,
    setshowUserEditModal,

    isAddLoading,
    setIsAddLoading,
    selectedRecord,
    setSelectedRecord,

    // setShowEmployeeEditModal,
  } = useAdminContext();

  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(UsersValidationSchema),
    defaultValues: {
      name: selectedRecord ? selectedRecord.name : '',
      email: selectedRecord ? selectedRecord.email : '',
      // password: selectedRecord ? selectedRecord.password : '',
      role: selectedRecord ? selectedRecord.role : '',
    },
  });

  const addUser = async (data) => {
    return await axiosInstance.post('/user', data);
  };

  const updateUser = async (data) => {
    return await axiosInstance.patch(
      `/user/${selectedRecord && selectedRecord.id}`,
      data
    );
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setIsAddLoading(true);
      const res = selectedRecord
        ? await updateUser(values)
        : await addUser(values);

      setIsAddLoading(false);

      selectedRecord
        ? setshowUserEditModal(!showUserEditModal)
        : setshowUserAddModal(!showUserAddModal);
      message.success(
        `Successfully ${selectedRecord ? 'Updated' : 'Added'} user`
      );
      setIsLoading(false);
      setSelectedRecord(null);
    } catch (e) {
      setIsLoading(false);
      setIsAddLoading(false);
    }
  };

  return (
    <div>
      <Modal
        footer={false}
        open={showUserAddModal || showUserEditModal}
        onCancel={() =>
          selectedRecord
            ? setshowUserEditModal(!showUserEditModal)
            : setshowUserAddModal(!showUserAddModal)
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-3"
        >
          <div>
            <label htmlFor="">Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter name"
                  {...field}
                  defaultValue={defaultValues.name}
                />
              )}
            />
            {errors.name && (
              <p className="text-xs italic text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="Enter email"
                  {...field}
                  defaultValue={defaultValues.email}
                />
              )}
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* <div>
            <label htmlFor="">Password</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  type="password"
                  // required={false}
                  placeholder="Enter password"
                  {...field}
                  defaultValue={defaultValues.password}
                />
              )}
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div> */}
          <div>
            <label htmlFor="">Role</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  className="w-full"
                  placeholder="Enter name"
                  {...field}
                  options={roles}
                  defaultValue={defaultValues.role}
                />
              )}
            />
            {errors.role && (
              <p className="text-xs italic text-red-500">
                {errors.role.message}
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

export default AddUsers;
