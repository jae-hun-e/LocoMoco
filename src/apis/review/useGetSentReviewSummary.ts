import { ReviewSummary, Reviews } from '@/types/review';
import { useQueries, useQuery } from '@tanstack/react-query';
import client from '../core';
import { UserInfo, getUserInfo } from '../user/useGetUserInfo';

export const getSentReviewsByMGCId = async (userId: number, mogakkoId: number) => {
  return await client.get<Reviews[]>({
    url: `/reviews/mogakko/${mogakkoId}/sent`,
    params: {
      reviewerId: userId,
    },
  });
};

export const useGetSentReviewsByMGCId = (userId: number, mogakkoId: number) => {
  return useQuery({
    queryKey: ['sentReviewsByMGCId', userId, mogakkoId] as const,
    queryFn: () => getSentReviewsByMGCId(userId, mogakkoId),
    enabled: !!userId,
  });
};

export const useGetSentReviewSummary = (userId: number, reviews?: Reviews[]) => {
  return useQueries({
    queries: reviews
      ? reviews.map((review) => ({
          queryKey: ['sentReviews', review],
          queryFn: async () => {
            return await getUserInfo(review.revieweeId);
          },
          select: (userInfo: UserInfo): ReviewSummary => {
            const { reviewId, reviewContentId, content, score, createdAt, revieweeId } = review;
            const { nickname, jobId, profileImage } = userInfo.userInfo;

            return {
              userId: revieweeId,
              reviewId,
              reviewContentId,
              content,
              score,
              nickname,
              jobId,
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

export default useGetSentReviewSummary;
