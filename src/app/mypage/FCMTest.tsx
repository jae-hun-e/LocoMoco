'use client';

import { getMessaging, getToken } from '@firebase/messaging';

const FCMTest = () => {
  const uploadToken = (currentToken: string) => {
    console.log('여기서 토큰을 서버에 업로드할꺼임.', currentToken);
  };

  const requestPermission = () => {
    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        alert('알림 권한이 허용됨');
        const messaging = getMessaging();

        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
          .then(async (currentToken) => {
            if (currentToken) {
              // 인증 후 토큰 업로드
              uploadToken(currentToken);
            } else {
              // 토큰 생성 불가
              alert('푸시 토큰 생성에 실패하였습니다.\n잠시 후 다시 시도해 주세요.');
              return;
            }
          })
          .catch((error) => {
            alert('푸시 등록 중 문제가 발생하였습니다.\n잠시 후 다시 시도해 주세요.');
            console.log('An error occurred while retrieving token. ', error);
            return;
          });
      } else {
        // permission === 'denied'
        alert('알림 권한 허용 안됨');
      }
    });
  };

  return (
    <div className="flex w-full justify-around">
      <button
        onClick={requestPermission}
        className="border-2"
      >
        알람권한 허용
      </button>
    </div>
  );
};

export default FCMTest;
