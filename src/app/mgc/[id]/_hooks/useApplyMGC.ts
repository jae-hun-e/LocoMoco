import client from '@/apis/core';
import { useMutation } from '@tanstack/react-query';

const participateMGC = async ({ MGCId, userId }: { MGCId: number; userId: number }) =>
  await client.post({ url: `/mogakko/map/${MGCId}/participate`, data: { userId } });

export const useApplyMGC = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: participateMGC,
    onError: (error) => {
      console.log('mgc apply error', error);
    },
    onSuccess: () => {
      console.log('mgc apply success');
    },
  });

  return { applyMGC: mutate, ...rest };
};
