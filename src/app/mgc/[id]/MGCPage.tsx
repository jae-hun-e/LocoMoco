'use client';

import { useEffect } from 'react';
import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import Inquiry from '@/app/mgc/[id]/_components/inquiry/Inquiry';
import { Separator } from '@/components/ui/separator';
import useMGCCreateUserId from '@/store/useMGCCreateUserId';
import ReportCreateModal from './_components/ReportCreateModal';

const MGCDetailPage = ({ MGCId }: { MGCId: number }) => {
  const { mgcDetail } = useGetMGCDetail(MGCId);

  const { createUserId, setMGCCreateUserId } = useMGCCreateUserId();

  const AuthorInfoData = {
    author: mgcDetail.creatorInfo,
    hits: mgcDetail.mogakkoInfo.views,
    createdAt: mgcDetail.mogakkoInfo.createdAt,
    updatedAt: mgcDetail.mogakkoInfo.updatedAt,
  };

  const MGCInfoData = {
    title: mgcDetail.mogakkoInfo.title,
    location: mgcDetail.mogakkoInfo.location,
    startTime: mgcDetail.mogakkoInfo.startTime,
    endTime: mgcDetail.mogakkoInfo.endTime,
    content: mgcDetail.mogakkoInfo.content,
    tagIds: mgcDetail.mogakkoInfo.tagIds,
  };

  const MGCApplyAreaData = {
    maxParticipants: mgcDetail.mogakkoInfo.maxParticipants,
    currentParticipants: mgcDetail.participants,
    endTime: mgcDetail.mogakkoInfo.endTime,
    deadline: mgcDetail.mogakkoInfo.deadline,
    like: mgcDetail.mogakkoInfo.likeCount,
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

      <Inquiry
        MGCId={mgcDetail.mogakkoInfo.mogakkoId}
        authorId={mgcDetail.creatorInfo.userId}
      />

      <MGCApplyArea {...MGCApplyAreaData} />
      <ReportCreateModal reportedId={createUserId} />
    </div>
  );
};

export default MGCDetailPage;
