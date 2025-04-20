import axiosInstance from '../interceptors/axios';

export const getAllUsers = () => {
  return axiosInstance.get('/visit/employees');
};

export const getEmployees = (id) => {
  return axiosInstance.get('/visit/employees');
};

export const addEmployee = (data) => {
  return axiosInstance.post('/visit/addEmployee', data);
};

export const updateEmployee = (id, data) => {
  return axiosInstance.patch(`/visit/updateEmployee/${id}`, data);
};

export const deleteEmployee = (id) => {
  return axiosInstance.delete(`/visit/deleteEmployee/${id}`);
};
