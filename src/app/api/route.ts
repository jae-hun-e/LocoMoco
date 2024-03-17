import { tokenData } from '@/app/_store/tokenData';
import admin, { ServiceAccount, messaging } from 'firebase-admin';
import { NextRequest } from 'next/server';

interface NotificationData {
  data: {
    title: string;
    body: string;
    // image: string;
    // click_action: string;
  };
}

const sendFCMNotification = async (data: NotificationData) => {
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
  // 앞서 푸시 권한과 함께 발급받아 저장해둔 토큰들을 모조리 불러온다.
  // 본인에게 익숙한 방법으로 저장하고 불러오면 된다.
  // 내 경우 firestore에 저장하고 불러오도록 했다.

  if (tokenData.length === 0) {
    console.log('토큰이 없습니다.');
    return;
  }

  // 푸시 데이터
  // api 호출할 때 받아올 데이터와 방금 불러온 토큰
  const notificationData = {
    ...data,
    tokens: tokenData,
  };

  // 푸시 발송
  //
  // // 모든 토큰에 발송
  // const res = await messaging().sendEach(tokenData);
  //

  // 선택한 여러개의 토큰으로 발송
  const res = await messaging().sendEachForMulticast(notificationData);

  //
  // // 토큰 하나에 발송
  // const res = await messaging().send(tokenData[0]);
  //

  return res;
};

export async function POST(req: NextRequest) {
  try {
    const { message } = (await req.json()) as { message: NotificationData };
    const res = await sendFCMNotification(message);

    return Response.json({ res });
  } catch (e) {
    console.log(e);
  }
  return;
}
