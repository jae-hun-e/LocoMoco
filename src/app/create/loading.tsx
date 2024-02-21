import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const MGCCreateLoading = () => {
  return (
    <>
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-full rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </>
  );
};

export default MGCCreateLoading;
