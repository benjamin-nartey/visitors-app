import { DatePicker, Modal } from 'antd';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useReportContext } from '../../routes/reports/context/report.context';
import { zodResolver } from '@hookform/resolvers/zod';
import reportVaildation from '../../utils/validations/report';
import axiosInstance from '../../interceptors/axios';
import Loader from '../loader/loader';

const SearchModal = ({ setterFn }) => {
  const { showReportModal, setShowReportModal, isLoading, setIsLoading } =
    useReportContext();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportVaildation),
    defaultValues: {
      fromDate: '',
      toDate: '',
    },
  });
  const postReport = async (data) => {
    const res = await axiosInstance.post('/visit/report', {
      ...data,
    });
    return res?.data;
  };

  const onSubmit = async (values) => {
    const _values = {
      ...values,
      fromDate: values['fromDate'].toISOString(),
      toDate: values['toDate'].toISOString(),
    };
    try {
      setIsLoading(true);
      const results = await postReport(_values);
      setIsLoading(false);

      setterFn(results);
      setShowReportModal(!showReportModal);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={showReportModal}
        footer={false}
        onCancel={() => setShowReportModal(!showReportModal)}
        maskClosable={false}
      >
        <div className="mt-9 mx-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7  p-4"
          >
            <div className="flex flex-col gap-2">
              <label className="font-bold text-xs">From Date</label>
              <Controller
                name={'fromDate'}
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: 400 }} />
                )}
              />

              {errors.fromDate && (
                <p className="text-xs italic text-red-500 mt-2">
                  {errors.fromDate.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-xs">To Date</label>
              <Controller
                name={'toDate'}
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: 400 }} />
                )}
              />

              {errors.toDate && (
                <p className="text-red-500 text-xs italic">
                  {errors.toDate.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-black text-white rounded-md mt-1 px-1 py-1 w-[91%]"
            >
              {isLoading ? (
                <Loader width={'w-4'} height={'w-4'} fillColor={'fill-white'} />
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SearchModal;
