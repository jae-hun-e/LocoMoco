'use client';

import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import Inquiry from '@/app/mgc/[id]/_components/Inquiry';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import { Separator } from '@/components/ui/separator';
import { dummyData } from '@/constants/mgcDummyData';

// TODO: api연결 후 더미 제거 [24/02/15]
const MGCDetail = ({ params }: { params: { id: number } }) => {
  const { mgcDetail } = useGetMGCDetail(params.id);
  console.log('mgcDetail', mgcDetail);

  /*
  const mgcData = {
    creatorInfo: {
      userId: 4,
      nickname: 'nickname',
    },
    participants: [],
    MogakkoInfo: {
      mogakkoId: 2,
      title: '모여서 각자 코딩',
      content: '모각코 모여~',
      startTime: '2024-02-22T01:23:14.381',
      endTime: '2024-02-22T01:23:14.381',
      deadline: '2024-02-22T01:23:14.381',
      createdAt: '2024-02-22T10:23:18',
      location: {
        address: '경기도 부천시 소사로 114번길 5',
        latitude: 31.4295839,
        longitude: 123.123456789,
        city: '소사본동',
      },
      maxParticipants: 4,
      likeCount: 0,
      tagIds: [1, 2, 3],
    },
  };
  */

  const MGCInfoData = {
    title: mgcDetail.MogakkoInfo.title,
    location: mgcDetail.MogakkoInfo.location,
    startTime: mgcDetail.MogakkoInfo.startTime,
    endTime: mgcDetail.MogakkoInfo.endTime,

    content: mgcDetail.MogakkoInfo.content,
    tagIds: mgcDetail.MogakkoInfo.tagIds,
  };

  return (
    <div>
      <AuthorInfo
        author={mgcDetail.creatorInfo.nickname}
        hits={dummyData.hits}
      />
      <Separator className="my-15pxr" />

      {/* TODO: 협의 후 모각코 생성쪽에서 공통 컴포넌트로 빼기 [24/02/09]*/}
      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={dummyData.joinUsers} />
      <Separator className="my-15pxr" />

      <Inquiry inquiries={dummyData.inquiries} />

      <MGCApplyArea
        maxParticipantsCount={dummyData.maxParticipantsCount}
        endTime={dummyData.endTime}
        like={dummyData.like}
      />
    </div>
  );
};

export default MGCDetail;
