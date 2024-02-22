import { MGCList } from '@/types/MGCList';
import qs from 'qs';
import client from '../core';

export const mgcList = async (tags: number[]) => {
  return await client.get<MGCList>({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/mogakko/map`,
    params: { tags },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
};
