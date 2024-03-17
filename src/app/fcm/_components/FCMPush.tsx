'use client';

import useSendPush from '@/app/fcm/_hooks/useSendPush';

const FCMPush = () => {
  const { sendPush } = useSendPush();
  const sendWebPush = () => {
    sendPush({
      title: '다들 화이팅!',
      body: '웹 푸시 보내기 테스트',
      click_action: 'https://locomoco.com',
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
