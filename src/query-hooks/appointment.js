import { useQuery } from '@tanstack/react-query';
import { getAppointments } from '../http/apointment';

export const useGetAllAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
  });
};
