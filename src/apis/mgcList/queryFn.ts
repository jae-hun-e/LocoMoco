import { MGCList } from '@/types/MGCList';
import client from '../core';

export const getMGCList = async (tags?: number[]) => {
  const { data } = await client.get<MGCList>({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/mogakko/map`,
    params: { tags },
  });

  return data;
};
