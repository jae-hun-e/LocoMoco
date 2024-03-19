import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import client from '../core';

const createMGC = async (MGCid: string) => {
  return await client.delete({
    url: `/mogakko/map/${MGCid}`,
  });
};

export const useDeleteMGC = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: createMGC,
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: () => {
      router.back();
      toast({
        description: '삭제가 완료되었습니다.',
      });
    },
  });
};
