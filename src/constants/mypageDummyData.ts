interface UserInfo {
  name: string;
  profileImg: string;
  nickname: string;
  birth: string;
  gender: boolean;
  job: string;

  likeMGC?: string[];
  currentJoinMGC?: string[];
  endJoinMGC?: string[];

  receivedReview?: string[];
  sentReview?: string[];
  reportList?: string[];

  blackList?: string[];
}

export const userInfoDummy: UserInfo = {
  name: '조재훈',
  profileImg: 'https://image.newsis.com/2023/07/12/NISI20230712_0001313626_web.jpg',
  nickname: '냐옹',
  birth: '1997-07-22',
  gender: true,
  job: '취준생',

  likeMGC: ['7', '8', '9'],
  currentJoinMGC: ['1', '2', '3'],
  endJoinMGC: ['4', '5', '6'],

  blackList: ['4', '5', '6'],
};
