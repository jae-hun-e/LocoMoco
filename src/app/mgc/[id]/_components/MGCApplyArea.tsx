'use client';

import { useState } from 'react';
import MainStyleButton from '@/components/MainStyleButton';
import { format } from 'date-fns';
import { HeartIcon } from 'lucide-react';

interface Props {
  maxParticipantsCount?: number;
  endTime: Date;
  like: number;
}
const MGCApplyArea = ({ maxParticipantsCount = 1, endTime, like }: Props) => {
  const [isLike, setLike] = useState<boolean>(false);
  const handleLike = () => {
    setLike(!isLike);
  };

  return (
    <section className="fixed bottom-0 z-50 w-[calc(100%-2.5rem)] bg-layer-1">
      <div className="my-10pxr flex h-40pxr items-center gap-18pxr">
        <MainStyleButton content={`참여하기 (2/${maxParticipantsCount})`} />

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
      </div>

      <div className="flex justify-center text-xs">
        <b>{format(endTime, 'M월 d일 h시')}</b>
        <p>까지만 신청 할 수 있어요!</p>
      </div>
    </section>
  );
};

export default MGCApplyArea;
