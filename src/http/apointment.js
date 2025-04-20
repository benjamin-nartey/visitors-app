import axiosInstance from '../interceptors/axios';

export const makeAppointment = (data) => {
  return axiosInstance.post('/appointment', data);
};

export const getAppointments = () => {
  return axiosInstance.get('/appointment');
};

export const updateAppointment = (id, data) => {
  return axiosInstance.patch(`/appointment/start/${id}`, data);
};
