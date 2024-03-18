'use client';

import { useEffect, useState } from 'react';
import useGetSentReviewSummary, {
  useGetSentReviewsByMGCId,
} from '@/apis/review/useGetSentReviewSummary';
import ReviewList from '@/app/_components/reviewList/ReviewList';
import { ReviewSummary } from '@/types/review';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const SendReviews = ({ params: { mgcId } }: { params: { mgcId: number } }) => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const id = getItem<string>(localStorage, USER_ID_KEY);
    if (id) {
      setUserId(id);
    }
  }, []);

  const { data } = useGetSentReviewsByMGCId(parseInt(userId, 10), mgcId);
  const { data: reviews, pending } = useGetSentReviewSummary(parseInt(userId, 10), data);

  return (
    <>
      <ReviewList
        reviews={
          !pending
            ? reviews.filter((reviewData): reviewData is ReviewSummary => reviewData !== undefined)
            : []
        }
        title="보낸"
      />
    </>
  );
};

export default SendReviews;
