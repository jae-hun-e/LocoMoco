'use client';

import ReviewAssessment from '@/app/_components/ReviewAssessment/ReviewAssessment';

const ReceivedReviews = ({ params }: { params: { userId: string } }) => {
  return <ReviewAssessment userId={params.userId} />;
};

export default ReceivedReviews;
