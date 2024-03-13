import client from '@/apis/core';
import { MGCSummary } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';

const getGetLikeMGC = async ({ userId }: { userId: number }) => {
  try {
    return await client.get<MGCSummary[]>({ url: `/users/${userId}/mogakko/like` });
  } catch (error) {
    console.error('마이페이지 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useGetLikeMGC = ({ userId }: { userId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['likeMGC', userId],
    queryFn: () => getGetLikeMGC({ userId }),
  });

  return { likeMGCs: data, ...rest };
};
