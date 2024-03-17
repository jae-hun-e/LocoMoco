export interface UserProfile {
  requestDto: {
    nickname: string;
    birth: string;
    gender: string;
    job: string;
  };
  file: string | null;
}
