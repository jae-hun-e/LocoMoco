'use client';

import MainStyleButton from '@/components/MainStyleButton';

const ReviewButtons = ({ MGCId }: { MGCId: number }) => {
  // TODO: 각 리뷰창으로 이동 [24/03/05]
  const handleReceivedReviewsLink = () => {
    console.log('MGCId', MGCId);
  };

  const handleSendReviewsLink = () => {
    console.log('MGCId', MGCId);
  };

  return (
    <div className="flex w-full gap-2">
      <MainStyleButton
        content="받은 리뷰"
        layout="flex-grow"
        className="bg-layer-5"
        onClick={handleReceivedReviewsLink}
      />
      <MainStyleButton
        content="보낸 리뷰"
        layout="flex-grow"
        className="bg-layer-5"
        onClick={handleSendReviewsLink}
      />
    </div>
  );
};

export default ReviewButtons;
