'use client';

import useGetReceivedReviews from '@/apis/review/useGetReceivedReviews';
import useGetReviewContents from '@/apis/review/useGetReviewContents';
import ReviewList from '../../_components/ReviewAssessment/ReviewList';

const ReviewAssessment = ({ userId }: { userId: string }) => {
  const { data: receivedReviews } = useGetReceivedReviews(userId);
  const { data: reviewContents } = useGetReviewContents();

  const goodReviews = receivedReviews ? receivedReviews.filter((review) => review.score > 2) : [];
  const badReviews = receivedReviews ? receivedReviews.filter((review) => review.score <= 2) : [];

  const goodList = reviewContents?.filter((content) => content.isPositive);
  const badList = reviewContents?.filter((content) => !content.isPositive);

  return (
    <div className="grid gap-20pxr">
      <ReviewList
        list={goodList ?? []}
        reviews={goodReviews}
        title="🙂 받은 칭찬"
      />
      <ReviewList
        list={badList ?? []}
        reviews={badReviews}
        title="😟 받은 비매너"
      />
    </div>
  );
};

export default ReviewAssessment;
