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
        <h2>어플리케이션에 어떠한 오류가 발생했습니다. :( </h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
};

export default GlobalError;
