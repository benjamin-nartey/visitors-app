import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button, Input, InputNumber, Modal, Select, message } from 'antd';
import { useAdminContext } from '../../../routes/admin/context/admin.context';
import axiosInstance from '../../../interceptors/axios';

import { TagValidation } from '../../../utils/validations/tag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTag } from '../../../http/tags';

const AddTag = (setFn) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setShowTagAddModal,
    showTagAddModal,
    showTagEditModal,
    isAddLoading,
    setIsTagLoading,
    selectedRecord,
    setSelectedRecord,
    setShowTagEditModal,
  } = useAdminContext();

  const {
    control,
    handleSubmit,
    formState: { errors, defaultValues },
  } = useForm({
    resolver: zodResolver(TagValidation),
    defaultValues: {
      number: selectedRecord ? selectedRecord.number : '',
    },
  });

  const addTag = async (data) => {
    return await axiosInstance.post('/tag', data);
  };

  const updateTag = async (data) => {
    return await axiosInstance.patch(
      `/tag/${selectedRecord && selectedRecord.id}`,
      data
    );
  };

  const onSubmit = async (values) => {
    saveTag(values);
  };

  const qClient = useQueryClient();

  const { mutate: saveTag, isPending: isPendingTag } = useMutation({
    mutationKey: 'savetag',
    mutationFn: (data) => {
      return selectedRecord ? updateTag(data) : createTag(data);
    },
    onSuccess: (data) => {
      message.success(
        `Tag ${selectedRecord ? 'updated' : 'added'}  successfully`
      );
      qClient.invalidateQueries({ queryKey: ['tags'] });
      selectedRecord
        ? setShowTagEditModal(!showTagEditModal)
        : setShowTagAddModal(!showTagAddModal);
    },
    onError: (err) => message.error(err.response.data.message),
  });

  return (
    <div>
      <Modal
        footer={false}
        open={showTagAddModal || showTagEditModal}
        onCancel={() =>
          selectedRecord
            ? setShowTagEditModal(!showTagEditModal)
            : setShowTagAddModal(!showTagAddModal)
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 mt-7"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="">Tag Number</label>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="Enter number"
                  {...field}
                  defaultValue={defaultValues.number}
                />
              )}
            />
            {errors.employee && (
              <p className="text-xs italic text-red-500">
                {errors.number.message}
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

export default AddTag;
