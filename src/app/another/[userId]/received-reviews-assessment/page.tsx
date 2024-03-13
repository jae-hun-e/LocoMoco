'use client';

import ReviewAssessment from '@/app/_components/ReviewAssessment/ReviewAssessment';

const ReceivedReviews = ({ params }: { params: { userId: string } }) => {
  return <ReviewAssessment userId={parseInt(params.userId, 10)} />;
};

export default ReceivedReviews;
