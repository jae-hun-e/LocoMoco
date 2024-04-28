'use client';

import { useEffect } from 'react';
import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import Inquiry from '@/app/mgc/[id]/_components/Inquiry';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import { Separator } from '@/components/ui/separator';
import useMGCCreateUserId from '@/store/useMGCCreateUserId';
import ReportCreateModal from './_components/ReportCreateModal';

const MGCDetailPage = ({ MGCId }: { MGCId: number }) => {
  const { mgcDetail } = useGetMGCDetail(MGCId);

  const { createUserId, setMGCCreateUserId } = useMGCCreateUserId();

  const AuthorInfoData = {
    author: mgcDetail.creatorInfo,
    hits: mgcDetail.MogakkoInfo.views,
    createdAt: mgcDetail.MogakkoInfo.createdAt,
    updatedAt: mgcDetail.MogakkoInfo.updatedAt,
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
    currentParticipants: mgcDetail.participants,
    endTime: mgcDetail.MogakkoInfo.endTime,
    deadline: mgcDetail.MogakkoInfo.deadline,
    like: mgcDetail.MogakkoInfo.likeCount,
    MGCId,
    createUserId: mgcDetail.creatorInfo.userId,
  };

  useEffect(() => {
    setMGCCreateUserId(mgcDetail.creatorInfo.userId);
  }, [mgcDetail.creatorInfo.userId, setMGCCreateUserId]);

  return (
    <div>
      <AuthorInfo {...AuthorInfoData} />
      <Separator className="my-15pxr" />

      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={mgcDetail.participants} />
      <Separator className="my-15pxr" />

      <Inquiry MGCId={mgcDetail.MogakkoInfo.mogakkoId} />

      <MGCApplyArea {...MGCApplyAreaData} />
      <ReportCreateModal reportedId={createUserId} />
    </div>
  );
};

export default MGCDetailPage;
