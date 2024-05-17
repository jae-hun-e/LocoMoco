import { toast } from '@/components/ui/use-toast';
import { useSaveTokenToDB } from '@/hooks/useSaveTokenToDB';
import { getDeviceType } from '@/utils/getDeviceType';
import { getMessaging, getToken } from '@firebase/messaging';

export const useRequestPermission = () => {
  console.log(process.env.NODE_ENV);
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
      toast({ description: '로그인을 해주세요' });
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
              toast({ description: '알림 권한 허용하였습니다.' });
            } else {
              // 토큰 생성 불가
              toast({
                description: '푸시 토큰 생성에 실패하였습니다...\n잠시 후 다시 시도해 주세요.',
              });
              return;
            }
          })
          .catch((error) => {
            toast({
              description: '푸시 등록 중 문제가 발생하였습니다...\n잠시 후 다시 시도해 주세요.',
            });
            console.log('An error occurred while retrieving token. ', error);
            return;
          });
      } else {
        // permission === 'denied'
        toast({ description: '💡 알림 권한을 허용하지 않으면 알람을 받을 수 없습니다.' });
      }
    });
  };

  return { requestPermission };
};
