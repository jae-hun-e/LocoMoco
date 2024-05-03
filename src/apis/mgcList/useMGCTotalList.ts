import { MGCList } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';
import client from '../core';

export interface TotalSearchProps {
  search?: string;
  searchType: 'TOTAL' | 'LOCATION';
  tags?: number[];
  cursor?: number;
  pageSize?: number;
}

export const getMGCTotalList = async ({
  search,
  searchType = 'LOCATION',
  tags,
  cursor,
  pageSize,
}: TotalSearchProps) => {
  const { data } = await client.get<MGCList>({
    url: `/mogakko/map`,
    params: { tags, search, searchType, cursor, pageSize },
  });

  return data;
};

const useMGCTotalList = ({ search, searchType, tags }: TotalSearchProps) => {
  return useQuery({
    queryKey: ['totalSearchMGC', search, searchType, tags] as const,
    queryFn: () => getMGCTotalList({ search, searchType, tags }),
  });
};

export default useMGCTotalList;
