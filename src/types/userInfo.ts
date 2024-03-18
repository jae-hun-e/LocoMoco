export interface UserProfile {
  requestDto: {
    nickname: string;
    birth: string;
    gender: string;
    jobId: number;
  };
  file: File | null;
}
