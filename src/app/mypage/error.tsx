'use client';

import { useEffect } from 'react';
import { ErrorFallBackProps } from '@/types/errorType';

const MyPageErrorFallBack = ({ error, reset }: ErrorFallBackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>마이페이지 데이터를 불러올 수 없습니다 :(</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default MyPageErrorFallBack;
