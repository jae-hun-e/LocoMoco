import { useQuery } from '@tanstack/react-query';
import { getCompleteMGCByUserId, getOngoingMGCByUserId } from './queryFn';

const useGetJoinMGCByUserId = (userId: string) => {
  return useQuery({
    queryKey: ['joinMGC', userId] as const,
    queryFn: async () => {
      const mgcResults = await Promise.all([
        getOngoingMGCByUserId(userId),
        getCompleteMGCByUserId(userId),
      ]);
      const flatMGCResults = mgcResults.flat();

      return flatMGCResults;
    },
    enabled: !!userId,
  });
};

export default useGetJoinMGCByUserId;
