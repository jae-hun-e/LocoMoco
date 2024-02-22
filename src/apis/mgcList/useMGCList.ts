import { useQuery } from '@tanstack/react-query';
import { mgcList } from './queryFn';

const useMGCList = (tags: number[]) => {
  return useQuery({
    queryKey: ['mapMGC', tags] as const,
    queryFn: () => mgcList(tags),
  });
};

export default useMGCList;
