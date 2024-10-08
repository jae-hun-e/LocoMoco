import client from '@/apis/core';
import { getItem } from '@/utils/storage';
import { useQuery } from '@tanstack/react-query';

export interface UserInfoProps {
  userId: number;
  nickname: string;
  birth: string;
  gender: string;
  temperature: number;
  jobId: number;
  email: string;
  profileImage: {
    imageId: number;
    path: string;
  };
  provider: string;
}

interface MypageInfoProps {
  userInfo: UserInfoProps;
  completeMogakkoCount: number;
  likeMogakkoCount: number;
  ongoingMogakkoCount: number;
}

const getMypageInfo = async ({ userId }: { userId: number }) => {
  try {
    return await client.get<MypageInfoProps>({
      url: `/users/${userId}`,
      headers: {
        Authorization: `Bearer ${getItem(localStorage, 'token')}`,
        provider: getItem(localStorage, 'provider'),
      },
    });
  } catch (error) {
    console.error('마이페이지 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useMypageInfo = ({ userId }: { userId: number }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['mypage', userId],
    queryFn: () => getMypageInfo({ userId }),
    enabled: !!userId,
  });

  return { myInfo: data, isLoading };
};
