import axiosInstance from '../interceptors/axios';

export const getReport = () => {
  return axiosInstance.get('/visit');
};

export const postReportFilters = (data) => {
  return axiosInstance.post('/visit/report', {
    ...data,
  });
};
