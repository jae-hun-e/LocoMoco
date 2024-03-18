'use client';

import useSendPush from '@/app/fcm/_hooks/useSendPush';

const FCMPush = () => {
  const { sendPush } = useSendPush();

  // TODO: userIds를 실제 사용자의 id들로 변경[24/03/17]
  const userIds = ['87'];

  const sendWebPush = () => {
    // TODO: 실제 넣을 데이터로 변경[24/03/17]
    sendPush({
      data: {
        title: '다들 화이팅!',
        body: '웹 푸시 보내기 테스트',
        click_action: 'https://locomoco.kro.kr',
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
