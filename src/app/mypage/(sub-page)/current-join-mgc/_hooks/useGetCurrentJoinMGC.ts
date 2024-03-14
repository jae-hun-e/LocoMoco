import client from '@/apis/core';
import { MGCSummary } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';

const getGetCurrentJoinMGC = async ({ userId }: { userId: number }) => {
  try {
    return await client.get<MGCSummary[]>({ url: `/users/${userId}/mogakko/ongoing` });
  } catch (error) {
    console.error('현재 진행 중 모각코 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useGetCurrentJoinMGC = ({ userId }: { userId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['currentMGC', userId],
    queryFn: () => getGetCurrentJoinMGC({ userId }),
  });

  return { currentMGCs: data, ...rest };
};
