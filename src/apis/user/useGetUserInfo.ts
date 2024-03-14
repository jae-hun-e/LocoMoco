import client from '@/apis/core';
import { useQuery } from '@tanstack/react-query';

export interface UserInfo {
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
}

export const getUserInfo = async (userId: number) => {
  return client.get<UserInfo>({
    url: `/users/${userId}`,
  });
};

const useGetUserInfo = (userId: number) => {
  return useQuery({
    queryKey: ['userInfo', userId] as const,
    queryFn: () => getUserInfo(userId),
  });
};

export default useGetUserInfo;
