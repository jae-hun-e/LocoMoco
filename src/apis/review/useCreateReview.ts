import client from '@/apis/core';
import { useMutation } from '@tanstack/react-query';

interface ReviewData {
  MGCId: number;
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
  });
};

export default useCreateReview;
