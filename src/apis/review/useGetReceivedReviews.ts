import { useQuery } from '@tanstack/react-query';
import client from '../core';

interface Reviews {
  reviewId: number;
  reviewerId: number;
  revieweeId: number;
  score: number;
  reviewContentId: number[];
  content: string;
}

export const getReceivedReviews = async (userId: string) => {
  return await client.get<Reviews[]>({ url: `/reviews/${userId}/recieved` });
};

const useGetReceivedReviews = (userId: string) => {
  return useQuery({
    queryKey: ['receivedReviews', userId] as const,
    queryFn: () => getReceivedReviews(userId),
  });
};

export default useGetReceivedReviews;
