import { useQuery } from '@tanstack/react-query';
import { getAllUsers, getEmployees } from '../http/user';

export const useGetAllUsers = () => {
  return useQuery({ queryKey: ['getAllUsers'], queryFn: getAllUsers });
};

export const useGetAllEmployees = () => {
  return useQuery({ queryKey: ['getAllEmployees'], queryFn: getEmployees });
};
