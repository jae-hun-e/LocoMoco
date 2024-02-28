import { createMGC } from '@/apis/mgc/queryFn';
import { useMutation } from '@tanstack/react-query';

export const useCreateMGC = () => {
  const { mutate, ...rest } = useMutation({ mutationFn: createMGC });

  return { createMGC: mutate, ...rest };
};
