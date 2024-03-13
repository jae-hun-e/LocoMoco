'use client';

import { useState } from 'react';
import { useApplyMGC } from '@/app/mgc/[id]/_hooks/useApplyMGC';
import { useIsApply } from '@/app/mgc/[id]/_hooks/useIsApply';
import MainStyleButton from '@/components/MainStyleButton';
import { toast } from '@/components/ui/use-toast';
import { getItem } from '@/utils/storage';
import { format } from 'date-fns';
import { HeartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  maxParticipants: number;
  currentParticipants: number;
  endTime: string;
  like: number;
  MGCId: number;
}

// TODO: 참여하기 API 연결[24/03/04]
// TODO: 찜하기 API 연결 - optimistic update [24/03/04]
const MGCApplyArea = ({ maxParticipants, currentParticipants, endTime, like, MGCId }: Props) => {
  const [isLike, setLike] = useState(false);
  const userId = Number(getItem<string | undefined>(localStorage, 'userId'));

  const { isParticipated } = useIsApply({ MGCId, userId });
  const { applyMGC } = useApplyMGC();

  const isClose = new Date() > new Date(endTime);

  const router = useRouter();

  const handleLoginAction = () => {
    if (!userId) {
      toast({
        description: '로그인 시에만 가능합니다.',
      });
      router.push('/signin');
    }
  };
  const handleLike = () => {
    handleLoginAction();
    setLike(!isLike);
  };

  const handleLinkChatting = () => {
    handleLoginAction();
    router.push(`/chat/${MGCId}`);
  };

  const handleApply = () => {
    handleLoginAction();
    applyMGC({ MGCId, userId });
  };

  return (
    <section className="fixed bottom-0 z-50 w-[calc(100%-2.5rem)] bg-layer-1">
      <MainStyleButton
        content={
          isClose
            ? '모집 종료된 모각코'
            : isParticipated
              ? `톡방으로 이동하기 (${currentParticipants}/${maxParticipants})`
              : `참여하기 (${currentParticipants}/${maxParticipants})`
        }
        disabled={isClose}
        onClick={isParticipated ? handleLinkChatting : handleApply}
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
        <b>{format(endTime, 'M월 d일 h시')}</b>
        <p>까지만 신청 할 수 있어요!</p>
      </div>
    </section>
  );
};

export default MGCApplyArea;
