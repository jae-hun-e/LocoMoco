import client from '@/apis/core';
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
    return await client.get<MypageInfoProps>({ url: `/users/${userId}` });
  } catch (error) {
    console.error('마이페이지 정보를 불러오는데 실패했습니다.', error);
  }
};

export const useMypageInfo = ({ userId }: { userId: number }) => {
  // Todo: undefined를 리턴하게 하지 말라고 에러가 뜨지만 일단 동작이 되니 나중에 꼭 고치기 03.18
  const { data, ...rest } = useQuery({
    queryKey: ['mypage', userId],
    queryFn: () => getMypageInfo({ userId }),
  });

  return { myInfo: data, ...rest };
};
