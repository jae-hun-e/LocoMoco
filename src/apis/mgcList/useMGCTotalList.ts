import { MGCList } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';
import client from '../core';

export interface TotalSearchProps {
  search?: string;
  searchType: 'TITLE_CONTENT' | 'LOCATION';
  tags?: number[];
  cursor?: number;
  pageSize?: number;
  offset?: number;
}

export const getMGCTotalList = async ({
  search,
  searchType = 'LOCATION',
  tags,
  cursor,
  pageSize,
  offset,
}: TotalSearchProps) => {
  const { data } = await client.get<MGCList>({
    url: `/mogakko/map`,
    params: { tags, search, searchType, cursor, pageSize, offset },
  });

  return data;
};

const useMGCTotalList = ({ search, searchType, tags, pageSize, offset }: TotalSearchProps) => {
  return useQuery({
    queryKey: ['totalSearchMGC', search, searchType, tags, pageSize, offset] as const,
    queryFn: () => getMGCTotalList({ search, searchType, tags, pageSize, offset }),
  });
};

export default useMGCTotalList;
