import client from '@/apis/core';
import { CreateMGCReq } from '@/apis/mgc/queryFn';
import { useMutation } from '@tanstack/react-query';

export const createThunderMGC = async (createThunderMGCReq: CreateMGCReq) => {
  return await client.put({ url: '/mogakko/map', data: createThunderMGCReq });
};

export const useCreateThunderMGC = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: createThunderMGC,
  });

  return { createThunderMGC: mutate, ...rest };
};
