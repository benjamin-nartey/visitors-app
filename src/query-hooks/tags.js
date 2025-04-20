import { useQuery } from '@tanstack/react-query';
import { fetchIssuedTags, getAllTags, unIssuedTags } from '../http/tags';

export const useGetAllTags = () => {
  return useQuery({ queryKey: ['tags'], queryFn: getAllTags });
};
export const useGetUnIssuedTags = () => {
  return useQuery({ queryKey: ['unIssuedTags'], queryFn: unIssuedTags });
};

export const useGetIssuedTags = () => {
  return useQuery({ queryKey: ['issuedTags'], queryFn: fetchIssuedTags });
};
