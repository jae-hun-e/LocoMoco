import { useQuery } from '@tanstack/react-query';
import client from '../core';

interface BlackList {
  userId: number;
  nickname: string;
  profileImage: {
    imageId: number;
    path: string;
  };
}

interface BlackLists {
  data: BlackList[];
}

export const getBlackList = async (userId: number) => {
  try {
    const { data } = await client.get<BlackLists>({
      url: `/users/${userId}/blacklist`,
    });

    return data;
  } catch (e) {
    alert(e);
  }
};

const useGetBlackList = (userId: number) => {
  return useQuery({
    queryKey: ['blackList', userId] as const,
    queryFn: () => getBlackList(userId),
  });
};

export default useGetBlackList;
