import client from '@/apis/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface InquiryReq {
  userId: number;
  mogakkoId: number;
  content: string;
}

const createInquiry = async (inquiryData: InquiryReq) => {
  return await client.put({ url: `/inquries`, data: inquiryData });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: createInquiry,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inquiry', variables.mogakkoId] });
    },
  });

  return { createInquiry: mutate, ...rest };
};
