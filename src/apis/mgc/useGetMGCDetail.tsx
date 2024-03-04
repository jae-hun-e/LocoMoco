import client from '@/apis/core';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface UserInfo {
  userId: number;
  nickname: string;
}
interface MogakkoInfo {
  mogakkoId: number;
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  createdAt: string;
  location: LocationInfo;
  maxParticipants: number;
  likeCount: number;

  content?: string;
  tagIds?: number[];
}
interface MgcData {
  creatorInfo: UserInfo;
  participants: UserInfo[]; // 여기에 참가자 정보에 대한 인터페이스를 추가하는 것이 좋습니다.
  MogakkoInfo: MogakkoInfo;
}

// TODO: queryFn 코로케이션 시킬지 말지 논의 하기 [24/02/26]
const getMGCDetail = async (id: number) => await client.get<MgcData>({ url: `/mogakko/map/${id}` });

export const useGetMGCDetail = (id: number) => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['mgc', id],
    queryFn: () => getMGCDetail(id),
  });

  return {
    mgcDetail: data,
    ...rest,
  };
};
