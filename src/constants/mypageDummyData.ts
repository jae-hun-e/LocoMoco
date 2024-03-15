import { UserInfo } from '@/apis/user/useGetUserInfo';

const gender = {
  FEMALE: 'FEMALE',
  MALE: 'MALE',
} as const;

const job = {
  JOB_SEEKER: 'JOB_SEEKER',
  DEVELOPER: 'DEVELOPER',
  ETC: 'ETC',
} as const;

const provider = {
  KAKAO: 'KAKAO',
  GITHUB: 'GITHUB',
} as const;

export const userInfoDummy: UserInfo = {
  userInfo: {
    userId: 78,
    nickname: '닉네임',
    birth: '2023-12-12',
    gender: gender.FEMALE,
    temperature: 39,
    job: job.DEVELOPER,
    email: 'naver.com',
    provider: provider.KAKAO,
    profileImage: null,
  },
  completeMogakkoCount: 3,
  likeMogakkoCount: 2,
  ongoingMogakkoCount: 1,
  // TODO: 백엔드와 합의 후 이름 변경 [24.03.15]
  blackListCount: 1,
  reportListCount: 3,
};
