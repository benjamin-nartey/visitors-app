import { useQuery } from '@tanstack/react-query';
import {
  fetchCheckedInToday,
  fetchCheckedOutToday,
  fetchOnPremises,
  fetchUncheckedOut,
} from '../http/visit';
import { getReport } from '../http/report';

export const useFetchCheckedInToday = () => {
  return useQuery({
    queryKey: ['checkedInToday'],
    queryFn: fetchCheckedInToday,
  });
};

export const useFetchCheckedOutToday = () => {
  return useQuery({
    queryKey: ['checkedOutToday'],
    queryFn: fetchCheckedOutToday,
  });
};

export const useFetchOnPremises = () => {
  return useQuery({
    queryKey: ['onPremises'],
    queryFn: fetchOnPremises,
  });
};

export const useUnCheckedOut = () => {
  return useQuery({
    queryKey: ['uncheckedOut'],
    queryFn: fetchUncheckedOut,
  });
};

export const useGetReport = (options) => {
  return useQuery({
    queryKey: ['report'],
    queryFn: getReport,
    ...options,
  });
};
