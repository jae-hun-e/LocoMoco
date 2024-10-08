import client from '@/apis/core';
import { LocationInfo } from '@/apis/mgc/queryFn';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export interface UserInfo {
  userId: number;
  nickname: string;
  profileImage: {
    imageId: number;
    path: string;
  };
}
export interface MogakkoInfo {
  mogakkoId: number;
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
  location: LocationInfo;
  maxParticipants: number;
  likeCount: number;
  views: number;

  content?: string;
  tagIds?: number[];
}
export interface MGCData {
  creatorInfo: UserInfo;
  participants: UserInfo[]; // 여기에 참가자 정보에 대한 인터페이스를 추가하는 것이 좋습니다.
  mogakkoInfo: MogakkoInfo;
}

export const getMGCDetail = async (id: number) =>
  await client.get<MGCData>({ url: `/mogakko/map/${id}` });

export const getMGCDetailQueryOption = (id: number) =>
  queryOptions({
    queryKey: ['mgc', id],
    queryFn: () => getMGCDetail(id),
  });

export const useGetMGCDetail = (id: number) => {
  const { data, ...rest } = useSuspenseQuery(getMGCDetailQueryOption(id));

  return {
    mgcDetail: data,
    ...rest,
  };
};
