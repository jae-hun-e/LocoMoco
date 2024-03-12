'use client';

import MainStyleButton from '@/components/MainStyleButton';

const ChattingButton = ({ MGCId }: { MGCId: number }) => {
  // TODO: 채팅방으로 이동 [24/03/05]
  const handleChattingLink = () => {
    console.log('MGCId', MGCId);
  };

  return (
    <MainStyleButton
      content="채팅방으로 이동"
      onClick={handleChattingLink}
    />
  );
};

export default ChattingButton;
