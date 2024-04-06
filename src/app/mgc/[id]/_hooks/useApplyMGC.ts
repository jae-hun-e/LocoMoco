import client from '@/apis/core';
import { getMGCDetailQueryOption } from '@/apis/mgc/useGetMGCDetail';
import { getCurrentApplyMGC } from '@/app/mgc/[id]/_hooks/useIsApply';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const participateMGC = async ({ MGCId, userId }: { MGCId: number; userId: string }) =>
  await client.post({ url: `/mogakko/map/${MGCId}/participate`, data: { userId } });

export const useApplyMGC = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: participateMGC,
    onError: (error) => {
      console.log('mgc apply error', error);
    },
    onSuccess: async (_, variables) => {
      const { MGCId, userId } = variables;

      await queryClient.invalidateQueries({ queryKey: getMGCDetailQueryOption(MGCId).queryKey });
      await queryClient.invalidateQueries({
        queryKey: getCurrentApplyMGC({ MGCId, userId }).queryKey,
      });
    },
  });

  return { applyMGC: mutate, ...rest };
};
