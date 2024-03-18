'use client';

import { useSaveTokenToDB } from '@/app/fcm/_hooks/useSaveTokenToDB';
import { getDeviceType } from '@/utils/getDeviceType';
import { getItem } from '@/utils/storage';
import { getMessaging, getToken } from '@firebase/messaging';

const FCMPermission = () => {
  const { saveToken } = useSaveTokenToDB();

  let userId: string | undefined;
  if (typeof window !== 'undefined') userId = getItem<string | undefined>(localStorage, 'userId');

  const uploadToken = (token: string) => {
    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    saveToken({
      id: userId,
      deviceType: getDeviceType(),
      token,
    });
  };

  const requestPermission = () => {
    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const messaging = getMessaging();

        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
          .then(async (currentToken) => {
            if (currentToken) {
              // 인증 후 토큰 업로드
              uploadToken(currentToken);
              alert('알림 권한 허용하였습니다.');
            } else {
              console.log('2');
              // 토큰 생성 불가
              alert('푸시 토큰 생성에 실패하였습니다...\n잠시 후 다시 시도해 주세요.');
              return;
            }
          })
          .catch((error) => {
            alert('푸시 등록 중 문제가 발생하였습니다...\n잠시 후 다시 시도해 주세요.');
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

export default FCMPermission;
