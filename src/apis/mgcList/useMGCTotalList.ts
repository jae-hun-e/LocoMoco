import { MGCList } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';
import client from '../core';

export const getMGCTotalList = async ({
  search,
  searchType = 'LOCATION',
  tags,
}: {
  search: string;
  searchType: 'TOTAL' | 'LOCATION';
  tags?: number[];
}) => {
  const { data } = await client.get<MGCList>({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/mogakko/map`,
    params: { tags, search, searchType },
  });

  return data;
};

const useMGCTotalList = ({
  search,
  searchType,
  tags,
}: {
  search: string;
  searchType: 'TOTAL' | 'LOCATION';
  tags: number[];
}) => {
  return useQuery({
    queryKey: ['totalSearchMGC', search, searchType, tags] as const,
    queryFn: () => getMGCTotalList({ search, searchType, tags }),
  });
};

export default useMGCTotalList;
