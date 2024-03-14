import client from '@/apis/core';
import { queryOptions, useQuery } from '@tanstack/react-query';

interface Props {
  MGCId: number;
  userId: string;
}
interface CurrentApplyMGC {
  isParticipated: boolean;
}
const currentApplyMGC = async ({ MGCId, userId }: Props) =>
  await client.get<CurrentApplyMGC>({
    url: `/mogakko/map/${MGCId}/participate`,
    params: { userId },
  });

export const getCurrentApplyMGC = ({ MGCId, userId }: Props) =>
  queryOptions({
    queryKey: ['currentApplyMGC', MGCId, userId],
    queryFn: () => currentApplyMGC({ MGCId, userId }),
  });

export const useIsApply = ({ MGCId, userId }: Props) => {
  const { data, ...rest } = useQuery(getCurrentApplyMGC({ MGCId, userId }));

  return { isParticipated: data?.isParticipated, ...rest };
};
