'use client';

import { useEffect, useState } from 'react';
import ReviewAssessment from '@/app/_components/ReviewAssessment/ReviewAssessment';
import { USER_ID_KEY, getItem } from '@/utils/storage';

const ReceivedReviews = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userId = getItem<string>(localStorage, USER_ID_KEY);
    if (userId) {
      setUserId(userId);
    }
  }, []);
  return <ReviewAssessment userId={userId} />;
};

export default ReceivedReviews;
