import { useQuery } from '@tanstack/react-query';
import client from '../core';

export interface ReviewContent {
  reviewContentId: number;
  content: string;
  isPositive: boolean;
}

export const getReviewContents = async () => {
  return await client.get<ReviewContent[]>({ url: '/reviews/contents' });
};

const useGetReviewContents = () => {
  return useQuery({
    queryKey: ['reviewContent'] as const,
    queryFn: () => getReviewContents(),
  });
};

export default useGetReviewContents;
