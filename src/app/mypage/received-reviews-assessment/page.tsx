'use client';

import ReviewAssessment from '@/app/_components/ReviewAssessment/ReviewAssessment';

const ReceivedReviews = () => {
  // TODO: 로컬스토리지 유틸함수가 머지되면 그걸로 로컬스토리지값 받아오게 수정하기 [24.03.06]
  const userId = 77;

  return <ReviewAssessment userId={userId} />;
};

export default ReceivedReviews;
