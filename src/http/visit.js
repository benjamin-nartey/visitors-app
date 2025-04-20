import axiosInstance from '../interceptors/axios';

export const fetchCheckedInToday = async () => {
  return axiosInstance.get('/visit/checkinsTodayRecords');
};

export const fetchCheckedOutToday = async () => {
  return axiosInstance.get('/visit/checkoutsTodayRecords');
};

export const fetchOnPremises = async () => {
  return axiosInstance.get('/visit/onPremiseTodayRecords');
};

export const checkout = async (tagId) => {
  return axiosInstance.post('/visit/checkout', {
    tagId,
  });
};

export const fetchUncheckedOut = () => {
  return axiosInstance.get('/visit/uncheckedOutVisits');
};
