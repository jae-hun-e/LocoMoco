import client from '@/apis/core';
import { queryOptions, useQuery } from '@tanstack/react-query';

interface CurrentApplyMGC {
  isParticipated: boolean;
}
const currentApplyMGC = async ({ MGCId, userId }: { MGCId: number; userId: number }) =>
  await client.get<CurrentApplyMGC>({
    url: `/mogakko/map/${MGCId}/participate`,
    params: { userId },
  });

export const getCurrentApplyMGC = ({ MGCId, userId }: { MGCId: number; userId: number }) =>
  queryOptions({
    queryKey: ['currentApplyMGC', MGCId, userId],
    queryFn: () => currentApplyMGC({ MGCId, userId }),
  });

export const useIsApply = ({ MGCId, userId }: { MGCId: number; userId: number }) => {
  const { data, ...rest } = useQuery(getCurrentApplyMGC({ MGCId, userId }));

  return { isParticipated: data?.isParticipated, ...rest };
};
