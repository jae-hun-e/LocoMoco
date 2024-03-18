'use client';

import MainStyleButton from '@/components/MainStyleButton';
import { routes } from '@/constants/routeURL';
import Link from 'next/link';

const ReviewButtons = ({ MGCId }: { MGCId: number }) => {
  return (
    <div className="flex w-full gap-2">
      <Link
        href={`${routes.receivedReviews}/${MGCId}`}
        className="flex-grow"
      >
        <MainStyleButton
          content="받은 리뷰"
          className="bg-layer-5"
        />
      </Link>
      <Link
        href={`${routes.sendReviews}/${MGCId}`}
        className="flex-grow"
      >
        <MainStyleButton
          content="보낸 리뷰"
          className="bg-layer-5"
        />
      </Link>
    </div>
  );
};

export default ReviewButtons;
