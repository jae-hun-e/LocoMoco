import client from '@/apis/core';
import { MGCSummary } from '@/types/MGCList';
import { useQuery } from '@tanstack/react-query';

const getGetEndMGC = async ({ userId }: { userId: number }) => {
  try {
    return await client.get<MGCSummary[]>({ url: `/users/${userId}/mogakko/complete` });
  } catch (error) {
    console.error('종료된 모각코 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useGetEndMGC = ({ userId }: { userId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['endMGC', userId],
    queryFn: () => getGetEndMGC({ userId }),
  });

  return { endMGCs: data, ...rest };
};
