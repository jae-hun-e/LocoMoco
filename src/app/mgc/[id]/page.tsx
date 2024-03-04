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

      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={mgcDetail.participants} />
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
