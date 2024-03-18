import client from '@/apis/core';
import { CreateMGCReq } from '@/apis/mgc/queryFn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const createThunderMGC = async (createThunderMGCReq: CreateMGCReq) => {
  return await client.post({ url: '/mogakko/map', data: createThunderMGCReq });
};

export const useCreateThunderMGC = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: createThunderMGC,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['totalSearchMGC'] });
    },
  });

  return { createThunderMGC: mutate, ...rest };
};
