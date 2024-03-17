'use client';

import useSendPush from '@/app/fcm/_hooks/useSendPush';

const FCMPush = () => {
  const { sendPush } = useSendPush();

  // TODO: userIds를 실제 사용자의 id들로 변경
  const userIds = ['87'];

  const sendWebPush = () => {
    sendPush({
      data: {
        title: '다들 화이팅!',
        body: '웹 푸시 보내기 테스트',
        click_action: 'https://locomoco.com',
      },
      userIds,
    });
  };

  return (
    <div className="flex w-full justify-around">
      <button
        className="border-2"
        onClick={sendWebPush}
      >
        웹 푸시 보내기
      </button>
    </div>
  );
};

export default FCMPush;
