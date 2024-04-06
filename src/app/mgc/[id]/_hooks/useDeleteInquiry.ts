import client from '@/apis/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface InquiryDeleteReq {
  inquiryId: number;
  userId: number;
  mogakkoId: number;
}

const deleteInquiry = async (inquiryData: InquiryDeleteReq) => {
  return await client.delete({
    url: `/inquiries/${inquiryData.inquiryId}`,
    params: { userId: inquiryData.userId },
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: deleteInquiry,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inquiry', variables.mogakkoId] });
    },
  });

  return { deleteInquiry: mutate, ...rest };
};
