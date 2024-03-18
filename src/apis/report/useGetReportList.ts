import { Report } from '@/types/report';
import { useQuery } from '@tanstack/react-query';
import client from '../core';

export const getReportList = async () => {
  return await client.get<Report[]>({
    url: `/reports`,
    params: { cursor: 1, pageSize: 10 },
  });
};

const useGetReportList = () => {
  return useQuery({
    queryKey: ['reports'] as const,
    queryFn: () => getReportList(),
  });
};

export default useGetReportList;
