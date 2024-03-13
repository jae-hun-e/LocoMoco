'use client';

import MainStyleButton from '@/components/MainStyleButton';

const LikeMGCAreaButtons = ({ MGCId }: { MGCId: number }) => {
  // TODO: 참여하기 API 실행 [24/03/05]
  const handleParticipation = () => {
    console.log('MGCId', MGCId);
  };

  const handleCancelLike = () => {
    console.log('찜하기 취소 -> 낙관적업데이트하기');
  };

  return (
    <div className="flex w-full gap-2">
      <MainStyleButton
        content="참여하기"
        layout="flex-grow"
        onClick={handleParticipation}
      />
      <MainStyleButton
        content="취소"
        layout="flex-grow-0"
        className="bg-layer-5 px-10pxr"
        onClick={handleCancelLike}
      />
    </div>
  );
};

export default LikeMGCAreaButtons;
