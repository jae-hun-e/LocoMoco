import sendFCMNotification from '@/app/api/fcm/sendFCM';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message, userIds } = await req.json();
    const res = await sendFCMNotification({ data: message, userIds: userIds });

    return Response.json({ res });
  } catch (e) {
    console.log('FCM Error: ', e);
  }

  return Response.json({});
}
