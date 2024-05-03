import client from '@/apis/core';
import { useQuery } from '@tanstack/react-query';

interface InquiryData {
  data: {
    inquiryId: number;
    userId: number;
    mogakkoId: number;
    profileImage: {
      imageId: number;
      path: string;
    };
    nickname: string;
    createdAt: string;
    updatedAt: string;
    content: string;
  }[];
}

const getInquiryData = async ({ MGCId }: { MGCId: number }) => {
  return await client.get<InquiryData>({ url: `/inquiries`, params: { mogakkoId: MGCId } });
};

export const useGetInquiry = ({ MGCId }: { MGCId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['inquiry', MGCId],
    queryFn: () => getInquiryData({ MGCId }),
  });

  return { inquiryData: data?.data, ...rest };
};
