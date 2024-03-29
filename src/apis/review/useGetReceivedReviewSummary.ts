import { ReviewSummary, Reviews } from '@/types/review';
import { useQueries, useQuery } from '@tanstack/react-query';
import client from '../core';
import { UserInfo, getUserInfo } from '../user/useGetUserInfo';

export const getReceivedReviewsByMGCId = async (userId: number, mogakkoId: number) => {
  return await client.get<Reviews[]>({
    url: `/reviews/mogakko/${mogakkoId}/recieved`,
    params: {
      revieweeId: userId,
    },
  });
};

export const useGetReceivedReviewsByMGCId = (userId: number, mogakkoId: number) => {
  return useQuery({
    queryKey: ['receivedReviewsByMGCId', userId, mogakkoId] as const,
    queryFn: () => getReceivedReviewsByMGCId(userId, mogakkoId),
    enabled: !!userId,
  });
};

export const useGetReceivedReviewSummary = (userId: number, reviews?: Reviews[]) => {
  return useQueries({
    queries: reviews
      ? reviews.map((review) => ({
          queryKey: ['reviews', review],
          queryFn: async () => {
            return await getUserInfo(review.reviewerId);
          },
          select: (userInfo: UserInfo): ReviewSummary => {
            const { reviewId, reviewContentId, content, score, createdAt, reviewerId } = review;
            const { nickname, job, profileImage } = userInfo.userInfo;

            return {
              userId: reviewerId,
              reviewId,
              reviewContentId,
              content,
              score,
              nickname,
              job,
              profileImage,
              createdAt,
            };
          },
        }))
      : [],
    combine: (results) => ({
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    }),
  });
};

export default useGetReceivedReviewSummary;
