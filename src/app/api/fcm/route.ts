import sendFCMNotification from '@/app/api/fcm/sendFCM';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const res = await sendFCMNotification(message);

    return Response.json({ res });
  } catch (e) {
    console.log(e);
  }
  return;
}
