import axiosInstance from '../interceptors/axios';

export const getReport = () => {
  return axiosInstance.get('/visit');
};
