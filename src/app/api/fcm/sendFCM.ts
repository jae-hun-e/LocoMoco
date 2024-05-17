import axios from 'axios';
import admin, { ServiceAccount, messaging } from 'firebase-admin';

interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  };
  userIds: string[];
}

const getTokens = async (userId: string) => {
  const { data } = await axios(
    `${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locomoco.kro.kr'}/api/db?id=${userId}`,
  );

  return data;
};

const sendFCMNotification = async ({ data, userIds }: NotificationData) => {
  // Firebase Admin SDK 초기화
  const serviceAccount: ServiceAccount = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 토큰 불러오기
  const tokens: string[] = [];

  for (const userId of userIds) {
    const getTokenData = await getTokens(userId);
    tokens.push(...getTokenData.data);
  }

  const notificationData = {
    ...data,
    tokens,
  };

  /* 푸시 발송
  // 모든 토큰에 발송
  const res = await messaging().sendEach(tokenData);
  // 토큰 하나에 발송
  const res = await messaging().send(tokenData[0]);
  */
  // 선택한 여러개의 토큰으로 발송
  const res = await messaging().sendEachForMulticast(notificationData);

  return res;
};

export default sendFCMNotification;
