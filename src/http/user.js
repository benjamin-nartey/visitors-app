import axiosInstance from "../interceptors/axios";

export const getAllUsers = () => {
  return axiosInstance.get("/user");
};

export const getEmployees = (id) => {
  return axiosInstance.get("/visit/employees");
};

export const addEmployee = (data) => {
  return axiosInstance.post("/visit/addEmployee", data);
};

export const addUser = (data) => {
  return axiosInstance.post("/user", data);
};

export const updateUser = (id, data) => {
  return axiosInstance.patch(`/user/${id}`, data);
};

export const updateEmployee = (id, data) => {
  return axiosInstance.patch(`/visit/updateEmployee/${id}`, data);
};

export const deleteUser = (id) => {
  return axiosInstance.delete(`/user/${id}`);
};
export const deleteEmployee = (id) => {
  return axiosInstance.delete(`/visit/deleteEmployee/${id}`);
};
