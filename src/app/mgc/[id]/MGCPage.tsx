'use client';

import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import Inquiry from '@/app/mgc/[id]/_components/Inquiry';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import { Separator } from '@/components/ui/separator';

const MGCDetailPage = ({ MGCId }: { MGCId: number }) => {
  const { mgcDetail } = useGetMGCDetail(MGCId);

  const AuthorInfoData = {
    author: mgcDetail.creatorInfo,
    hits: mgcDetail.MogakkoInfo.views,
    createdAt: mgcDetail.MogakkoInfo.createdAt,
  };

  const MGCInfoData = {
    title: mgcDetail.MogakkoInfo.title,
    location: mgcDetail.MogakkoInfo.location,
    startTime: mgcDetail.MogakkoInfo.startTime,
    endTime: mgcDetail.MogakkoInfo.endTime,
    content: mgcDetail.MogakkoInfo.content,
    tagIds: mgcDetail.MogakkoInfo.tagIds,
  };

  const MGCApplyAreaData = {
    maxParticipants: mgcDetail.MogakkoInfo.maxParticipants,
    currentParticipants: mgcDetail.participants.length + 1,
    endTime: mgcDetail.MogakkoInfo.endTime,
    like: mgcDetail.MogakkoInfo.likeCount,
    MGCId,
  };

  return (
    <div>
      <AuthorInfo {...AuthorInfoData} />
      <Separator className="my-15pxr" />

      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={mgcDetail.participants} />
      <Separator className="my-15pxr" />

      <Inquiry MGCId={mgcDetail.MogakkoInfo.mogakkoId} />

      <MGCApplyArea {...MGCApplyAreaData} />
    </div>
  );
};

export default MGCDetailPage;
