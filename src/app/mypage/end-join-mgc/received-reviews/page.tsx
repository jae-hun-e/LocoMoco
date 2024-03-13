'use client';

import { useEffect, useState } from 'react';
import useGetReceivedReviewsByMGCId, {
  useGetReceivedReviews,
} from '@/apis/review/useGetReceivedReviewsByMGCId';
import ReviewList from '@/app/_components/reviewList/ReviewList';
import { ReviewSummary } from '@/types/review';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const ReceivedReviews = () => {
  const [userId, setUserId] = useState('');
  // TODO: 종료된 모각코에서 클릭 시 받아오기 [24.03.12]
  const MGCId = 71;

  useEffect(() => {
    const id = getItem<string>(localStorage, USER_ID_KEY);
    if (id) {
      setUserId(id);
    }
  }, []);

  const { data } = useGetReceivedReviewsByMGCId(parseInt(userId, 10), MGCId);
  const { data: reviews, pending } = useGetReceivedReviews(parseInt(userId, 10), MGCId, data);

  console.log(reviews);
  return (
    <>
      <ReviewList
        reviews={
          !pending
            ? reviews.filter(
                (reviewData): reviewData is ReviewSummary =>
                  reviewData !== undefined && reviewData.score >= 3,
              )
            : []
        }
        title="받은"
      />
    </>
  );
};

export default ReceivedReviews;
