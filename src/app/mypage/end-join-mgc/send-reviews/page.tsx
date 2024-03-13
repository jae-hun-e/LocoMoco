'use client';

import { useEffect, useState } from 'react';
import useGetSentReviewSummary, {
  useGetSentReviewsByMGCId,
} from '@/apis/review/useGetSentReviewSummary';
import ReviewList from '@/app/_components/reviewList/ReviewList';
import { ReviewSummary } from '@/types/review';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const SendReviews = () => {
  const [userId, setUserId] = useState('');
  // TODO: 종료된 모각코에서 클릭 시 받아오기 [24.03.12]
  const MGCId = 71;

  useEffect(() => {
    const id = getItem<string>(localStorage, USER_ID_KEY);
    if (id) {
      setUserId(id);
    }
  }, []);

  const { data } = useGetSentReviewsByMGCId(parseInt(userId, 10), MGCId);
  const { data: reviews, pending } = useGetSentReviewSummary(parseInt(userId, 10), MGCId, data);

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
