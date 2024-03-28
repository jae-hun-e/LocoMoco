import client from '@/apis/core';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface UserInfo {
  userInfo: {
    userId: number;
    nickname: string;
    birth: string;
    gender: 'FEMALE' | 'MALE';
    temperature: number;
    job: 'DEVELOPER' | 'JOB_SEEKER' | 'ETC';
    email: string;
    provider: 'KAKAO' | 'GITHUB';
    profileImage: {
      imageId: number;
      path: string;
    } | null;
  };
  completeMogakkoCount: number;
  likeMogakkoCount: number;
  ongoingMogakkoCount: number;
  blackListCount: number;
  reportListCount: number;
}

export const getUserInfo = async (userId: number) => {
  return client.get<UserInfo>({
    url: `/users/${userId}`,
  });
};

const useGetUserInfo = (userId: number) => {
  return useSuspenseQuery({
    queryKey: ['userInfo', userId] as const,
    queryFn: () => getUserInfo(userId),
  });
};

export default useGetUserInfo;
