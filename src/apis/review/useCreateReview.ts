import client from '@/apis/core';
import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

interface ReviewData {
  MGCId: string;
  reviewerId: string;
  data: {
    revieweeId: number;
    blockDesired: boolean;
    score: number;
    reviewContentId: number[];
    content: string;
  };
}

const createReview = async (reviewData: ReviewData) => {
  return await client.post({
    url: `/reviews/${reviewData.MGCId}/${reviewData.reviewerId}`,
    data: reviewData.data,
  });
};

const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
    onSuccess() {
      toast({
        description: '후기 작성이 완료되었습니다.',
      });
    },
    onError() {
      toast({
        description: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });
};

export default useCreateReview;
