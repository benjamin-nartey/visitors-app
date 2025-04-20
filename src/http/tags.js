import axiosInstance from '../interceptors/axios';

export const getAllTags = () => {
  return axiosInstance.get('/tag');
};
export const unIssuedTags = () => {
  return axiosInstance.get('/tag/unIssuedTags');
};

export const fetchIssuedTags = () => {
  return axiosInstance.get('/tag/issuedTags');
};

export const createTag = (data) => {
  return axiosInstance.post('/tag', data);
};

export const editTag = (id, data) => {
  return axiosInstance.patch(`/tag/${id}`, data);
};

export const deleteTag = (id) => {
  return axiosInstance.delete(`/tag/${id}`);
};
