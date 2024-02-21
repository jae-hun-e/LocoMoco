'use client';

import { useEffect } from 'react';
import { ErrorFallBackProps } from '@/types/errorType';

const GlobalError = ({ error, reset }: ErrorFallBackProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html>
      <body>
        <h2>렌더링 오류 :( </h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
