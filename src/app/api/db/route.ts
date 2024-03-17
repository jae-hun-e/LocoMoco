import selectBySQL from '@/libs/database';
import { NextRequest } from 'next/server';

interface DeviceKey {
  phone: string;
  pad: string;
  desktop: string;
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  const sql = `SELECT * FROM device_key WHERE user_id = ${id}`;
  try {
    const { data, error } = await selectBySQL<DeviceKey>(sql);
    const tokens = [data[0].phone, data[0].pad, data[0].desktop].filter((token) => token);

    return Response.json({ data: tokens, error });
  } catch (error) {
    console.log('get device key error: ', error);
  }
}

export async function POST(req: NextRequest) {
  const { id, deviceType, token } = await req.json();

  let sql;
  switch (deviceType) {
    case 'phone':
      sql = `UPDATE device_key SET phone = '${token}'  WHERE user_id = ${id}`;
      break;
    case 'pad':
      sql = `UPDATE device_key SET pad = '${token}'  WHERE user_id = ${id}`;
      break;
    case 'desktop':
      sql = `UPDATE device_key SET desktop = '${token}'  WHERE user_id = ${id}`;
      break;
    default:
      return Response.json({ error: 'device_type is not valid' });
  }

  try {
    const { data, error } = await selectBySQL(sql);

    return Response.json({ data, error });
  } catch (error) {
    console.log(error);
  }
}
