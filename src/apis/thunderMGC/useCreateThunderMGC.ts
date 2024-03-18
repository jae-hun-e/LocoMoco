import client from '@/apis/core';
import { CreateMGCReq } from '@/apis/mgc/queryFn';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface CreatThunderMGCRes {
  id: number;
}

export const createThunderMGC = async (createThunderMGCReq: CreateMGCReq) => {
  return await client.post<CreatThunderMGCRes>({ url: '/mogakko/map', data: createThunderMGCReq });
};

export const useCreateThunderMGC = () => {
  const router = useRouter();
  const { mutate, ...rest } = useMutation({
    mutationFn: createThunderMGC,
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: ({ id }) => {
      router.push(`/mgc/${id}`);
    },
  });

  return { createThunderMGC: mutate, ...rest };
};
