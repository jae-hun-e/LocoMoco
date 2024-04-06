import client from '@/apis/core';
import { InquiryReq } from '@/app/mgc/[id]/_hooks/useCreateInquiry';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const patchInquiry = async (inquiryData: InquiryReq) => {
  return await client.patch({
    url: `/inquiries/${inquiryData.inquiryId}`,
    data: { userId: inquiryData.userId, content: inquiryData.content },
  });
};

export const usePatchInquiry = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: patchInquiry,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['inquiry', variables.mogakkoId] });
    },
  });

  return { patchInquiry: mutate, ...rest };
};
