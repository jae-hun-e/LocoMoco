import client from '@/apis/core';
import { CreateMGCReq } from '@/apis/mgc/queryFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const patchMGC = async (patchData: CreateMGCReq, mgcId: number | undefined) =>
  await client.patch({ url: `/mogakko/map/${mgcId}`, data: patchData });

export const usePatchMGC = (mgcId: number | undefined) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, ...rest } = useMutation({
    mutationFn: (req: CreateMGCReq) => patchMGC(req, mgcId),
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['mgc', mgcId] });
      router.push(`/mgc/${mgcId}`);
    },
  });

  return { patchMGC: mutate, ...rest };
};
