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

export const getReceivedReviews = async (userId: number) => {
  return await client.get<Reviews[]>({ url: `/users/${userId}/review-recieved` });
};

const useGetReceivedReviews = (userId: number) => {
  return useQuery({
    queryKey: ['receivedReviews', userId] as const,
    queryFn: () => getReceivedReviews(userId),
  });
};

export default useGetReceivedReviews;
