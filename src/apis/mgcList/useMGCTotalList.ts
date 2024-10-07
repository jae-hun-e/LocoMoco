import { MGCList } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';
import client from '../core';

export interface TotalSearchProps {
  search?: string;
  searchType?: 'titleAndContent' | 'nickname' | 'location';
  tags?: number[];
  pageSize?: number;
  offset?: number;
  titleAndContent?: string;
  location?: string;
  nickname?: string;
}

export const getMGCTotalList = async ({
  search,
  tags,
  pageSize,
  offset,
  titleAndContent,
  location,
  nickname,
}: TotalSearchProps) => {
  const { data } = await client.get<MGCList>({
    url: `/mogakko/map`,
    params: { tags, search, titleAndContent, location, nickname, pageSize, offset },
  });

  return data;
};

const useMGCTotalList = ({ search, searchType, tags, pageSize, offset }: TotalSearchProps) => {
  return useQuery({
    queryKey: ['totalSearchMGC', search, searchType, tags, pageSize, offset] as const,
    queryFn: () => getMGCTotalList({ [searchType!]: search, tags, pageSize, offset }),
  });
};

export default useMGCTotalList;
