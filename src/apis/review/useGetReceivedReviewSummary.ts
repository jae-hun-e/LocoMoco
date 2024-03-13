import { ReviewSummary, Reviews } from '@/types/review';
import { useQueries, useQuery } from '@tanstack/react-query';
import client from '../core';
import { getMGCDetail } from '../mgc/useGetMGCDetail';
import { MgcData } from '../mgc/useGetMGCDetail';
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

export const useGetReceivedReviewSummary = (
  userId: number,
  mogakkoId: number,
  reviews?: Reviews[],
) => {
  return useQueries({
    queries: reviews
      ? reviews.map((review) => ({
          queryKey: ['reviews', review, mogakkoId],
          queryFn: () => {
            return Promise.all([getUserInfo(review.reviewerId), getMGCDetail(mogakkoId)]);
          },
          select: (reviewData: [UserInfo, MgcData]): ReviewSummary => {
            const { reviewId, reviewContentId, content, score } = review;
            const { nickname, job, profileImage } = reviewData[0];
            const { createdAt } = reviewData[1].MogakkoInfo;

            return {
              userId,
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
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      };
    },
  });
};

export default useGetReceivedReviewSummary;
