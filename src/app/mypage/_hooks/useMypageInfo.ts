import client from '@/apis/core';
import { useQuery } from '@tanstack/react-query';

interface MypageInfoProps {
  userId: number;
  nickname: string;
  birth: string;
  gender: string;
  temperature: number;
  job: string;
  email: string;
  profileImage: {
    imageId: number;
    path: string;
  };
  provider: string;
}

const getMypageInfo = async ({ userId }: { userId: number }) => {
  try {
    return await client.get<MypageInfoProps>({ url: `/users/${userId}` });
  } catch (error) {
    console.error('마이페이지 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useMypageInfo = ({ userId }: { userId: number }) => {
  const { data, ...rest } = useQuery({
    queryKey: ['mypage', userId],
    queryFn: () => getMypageInfo({ userId }),
  });

  return { myInfo: data, ...rest };
};
