import { useQuery } from '@tanstack/react-query';
import { getMGCList } from './queryFn';

const useMGCList = (tags: number[]) => {
  return useQuery({
    queryKey: ['mapMGC', tags] as const,
    queryFn: () => getMGCList(tags),
  });
};

export default useMGCList;
