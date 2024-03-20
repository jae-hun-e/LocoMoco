'use client';

import ReviewAssessment from '@/app/_components/ReviewAssessment/ReviewAssessment';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const ReceivedReviews = () => {
  const userId = getItem<string>(localStorage, USER_ID_KEY);

  return <ReviewAssessment userId={userId!} />;
};

export default ReceivedReviews;
