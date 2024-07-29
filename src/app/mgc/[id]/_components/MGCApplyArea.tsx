'use client';

import { MouseEvent } from 'react';
import { UserInfo } from '@/apis/mgc/useGetMGCDetail';
import { useApplyMGC } from '@/app/mgc/[id]/_hooks/useApplyMGC';
import { useIsApply } from '@/app/mgc/[id]/_hooks/useIsApply';
import { useIsLikeMGC } from '@/app/mgc/[id]/_hooks/useIsLikeMGC';
import { useLikeToggleMGC } from '@/app/mgc/[id]/_hooks/useLikeMGC';
import MainStyleButton from '@/components/MainStyleButton';
import { toast } from '@/components/ui/use-toast';
import useSendPush from '@/hooks/useSendPush';
import { getItem } from '@/utils/storage';
import { format } from 'date-fns';
import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { event } from '../../../../libs/gtag';

interface Props {
  maxParticipants: number;
  currentParticipants: UserInfo[];
  endTime: string;
  deadline: string;
  like: number;
  MGCId: number;
  createUserId: number;
}

// TODO: 찜하기 API 연결 - optimistic update [24/03/04]
const MGCApplyArea = ({
  maxParticipants,
  currentParticipants,
  endTime,
  deadline,
  like,
  MGCId,
  createUserId,
}: Props) => {
  const userId = getItem<string | undefined>(localStorage, 'userId');

  // TODO: 모각코 디테일의 찜하기데이터 안에 userId도 들어가 있다면 isLike, setIsLike가 아닌 캐시 값으로 판단할 것 [24/04/07]
  const { isLike, setIsLike } = useIsLikeMGC({ userId: Number(userId), MGCId });

  const { likeToggleMGC } = useLikeToggleMGC({ isLike, setIsLike });

  const { isParticipated } = useIsApply({ MGCId, userId: userId ?? '' });
  const { applyMGC } = useApplyMGC();

  const { sendPush } = useSendPush();

  const router = useRouter();

  const handleLoginAction = () => {
    if (!userId) {
      toast({ description: '로그인 시에만 가능합니다.' });
      router.push('/signin');
    }
  };
  const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleLoginAction();

    likeToggleMGC({ MGCId, userId: userId ?? '' });
  };

  const handleLinkChatting = () => {
    handleLoginAction();
    router.push(`/chat/${MGCId}`);
  };

  const handleLinkEdit = () => {
    router.push(`/edit-mgc/${MGCId}`);
  };

  const handleApply = () => {
    handleLoginAction();
    sendPush({
      data: {
        title: `모각코에 새로운 멤버가 참여했습니다.`,
        body: '즐거운 모각코 시간을 보내세요!',
        click_action: window.location.href,
      },
      userIds: currentParticipants.map((user) => user.userId + ''),
    });

    applyMGC({ MGCId, userId: userId ?? '' });

    event({
      action: 'apply_click',
      category: 'Button',
      label: 'Participate',
      value: '참여하기',
    });
  };

  const currentParticipantsLength = currentParticipants.length;

  const handleButtonState = () => {
    const currentUserIds = currentParticipants.map((user) => user.userId);

    const isParticipants = currentUserIds.includes(Number(userId));
    const isCapacityExceeded = currentParticipantsLength >= maxParticipants;
    const isOwner = Number(userId) === createUserId;
    const isClose = new Date() > new Date(endTime) || new Date() > new Date(deadline);

    // 참여자임
    if (isParticipants) {
      if (isClose) return buttonVariants[1];
      if (isOwner) return buttonVariants[2];
      if (isParticipated) return buttonVariants[3];
      if (isCapacityExceeded) return buttonVariants[0];
      else return buttonVariants[4];
    } else {
      if (isCapacityExceeded) return buttonVariants[0];
      if (isClose) return buttonVariants[1];
      else return buttonVariants[4];
    }
  };

  const buttonVariants = [
    { content: '정원초과', disabled: true },
    { content: '모집 종료된 모각코', disabled: true },
    { content: '수정하기', action: handleLinkEdit },
    {
      content: `톡방으로 이동하기 (${currentParticipantsLength}/${maxParticipants})`,
      action: handleLinkChatting,
    },
    { content: `참여하기 (${currentParticipantsLength}/${maxParticipants})`, action: handleApply },
  ];

  return (
    <section className="fixed bottom-50pxr z-50 w-[calc(100%-2.5rem)] bg-layer-1">
      <MainStyleButton
        content={handleButtonState().content}
        disabled={handleButtonState().disabled}
        onClick={handleButtonState().action}
      >
        <button
          className="flex flex-col items-center"
          onClick={handleLike}
        >
          <HeartIcon
            size={20}
            strokeWidth={2}
            color={isLike ? 'red' : 'black'}
            fill={isLike ? 'red' : 'white'}
          />
          <p className="text-xs">{like}</p>
        </button>
      </MainStyleButton>

      <div className="flex justify-center text-xs">
        <b>{format(endTime, 'M월 d일 HH시 mm분')}</b>
        <p>까지만 신청 할 수 있어요!</p>
      </div>
    </section>
  );
};

export default MGCApplyArea;
