import client from '@/apis/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface InquiryReq {
  userId: number;
  mogakkoId: number;
  content: string;
  inquiryId?: number;
}

const createInquiry = async (inquiryData: InquiryReq) => {
  return await client.put({ url: `/inquiries`, data: inquiryData });
};

export const useCreateInquiry = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: createInquiry,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['inquiry', variables.mogakkoId] });
    },
  });

  return { createInquiry: mutate, ...rest };
};
