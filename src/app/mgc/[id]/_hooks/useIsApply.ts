import client from '@/apis/core';
import { useQuery } from '@tanstack/react-query';

interface CurrentApplyMGC {
  isParticipated: true;
}
const currentApplyMGC = async ({ MGCId, userId }: { MGCId: number; userId: number }) =>
  await client.get<CurrentApplyMGC>({
    url: `/mogakko/map/${MGCId}/participate`,
    params: { userId },
  });
export const useIsApply = ({ MGCId, userId }: { MGCId: number; userId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['currentApplyMGC', MGCId, userId],
    queryFn: () => currentApplyMGC({ MGCId, userId }),
  });

  return { isParticipated: data?.isParticipated, ...rest };
};
