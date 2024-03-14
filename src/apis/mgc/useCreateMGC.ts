import { createMGC } from '@/apis/mgc/queryFn';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useCreateMGC = () => {
  const router = useRouter();
  const { mutate, ...rest } = useMutation({
    mutationFn: createMGC,
    onError: (error) => {
      console.log('error', error);
    },
    onSuccess: ({ id }) => {
      router.push(`/mgc/${id}`);
    },
  });

  return { createMGC: mutate, ...rest };
};
