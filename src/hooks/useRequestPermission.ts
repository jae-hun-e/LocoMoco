import { useSaveTokenToDB } from '@/app/fcm/_hooks/useSaveTokenToDB';
import { getDeviceType } from '@/utils/getDeviceType';
import { getMessaging, getToken } from '@firebase/messaging';

export const useRequestPermission = () => {
  const { saveToken } = useSaveTokenToDB();
  const uploadToken = ({ token, userId }: { token: string; userId: string }) => {
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

  const requestPermission = ({ userId }: { userId: string | undefined }) => {
    if (!userId) {
      alert('로그인을 해주세요');
      return;
    }

    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const messaging = getMessaging();

        getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY })
          .then(async (currentToken) => {
            if (currentToken) {
              // 인증 후 토큰 업로드
              uploadToken({ token: currentToken, userId });
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

  return { requestPermission };
};
