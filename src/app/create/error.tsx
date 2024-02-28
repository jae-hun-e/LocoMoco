'use client';

import { useEffect } from 'react';
import { ErrorFallBackProps } from '@/types/errorType';

const CreateMGCErrorFallBack = ({ error, reset }: ErrorFallBackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>생성페이지를 불러올 수 없습니다 :(</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default CreateMGCErrorFallBack;
