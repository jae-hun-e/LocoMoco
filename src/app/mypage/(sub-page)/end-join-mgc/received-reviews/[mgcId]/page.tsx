'use client';

import { useEffect, useState } from 'react';
import useGetReceivedReviewSummary, {
  useGetReceivedReviewsByMGCId,
} from '@/apis/review/useGetReceivedReviewSummary';
import ReviewList from '@/app/_components/reviewList/ReviewList';
import { ReviewSummary } from '@/types/review';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const ReceivedReviews = ({ params: { mgcId } }: { params: { mgcId: number } }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = getItem<string>(localStorage, USER_ID_KEY);
    if (id) {
      setUserId(id);
    }
  }, []);

  const { data } = useGetReceivedReviewsByMGCId(parseInt(userId, 10), mgcId);
  const { data: reviewSummary, pending } = useGetReceivedReviewSummary(parseInt(userId, 10), data);

  return (
    <ReviewList
      reviews={
        !pending
          ? reviewSummary.filter(
              (reviewData): reviewData is ReviewSummary =>
                reviewData !== undefined && reviewData.score >= 3,
            )
          : []
      }
      title="받은"
    />
  );
};

export default ReceivedReviews;
