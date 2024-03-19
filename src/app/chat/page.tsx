'use client';

import { useEffect } from 'react';
import useChatList from '@/apis/chat/useChatList';
import ProgressBar from '@/components/ProgressBar';
import { getItem } from '@/utils/storage';
import { differenceInDays, format, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const ChatList = () => {
  const router = useRouter();
  const handleDate = (date: string) => {
    const dateDiff = differenceInDays(new Date(), date);
    if (dateDiff === 0) return format(date, 'bHH:mm', { locale: ko });
    else if (dateDiff === 1) return '어제';
    else {
      if (getYear(date) === getYear(new Date())) return format(date, 'MM-dd');
      else return format(date, 'yyyy-MM-dd');
    }
  };

  const { data: chatRooms, isLoading } = useChatList();

  useEffect(() => {
    if (!getItem(localStorage, 'token')) router.replace('/signin');
  }, [router]);

  return (
    <ul className="flex flex-col gap-2">
      {isLoading ? (
        <ProgressBar />
      ) : chatRooms?.length !== 0 ? (
        chatRooms?.map(({ mogakkoId, lastMessage, name, updatedAt }) => (
          <li
            key={mogakkoId}
            className="flex items-center justify-between gap-2"
            onClick={() => router.push(`chat/${mogakkoId}`)}
          >
            <Image
              src={lastMessage.senderProfileImage || '/oh.png'}
              width={48}
              height={48}
              alt="profile"
              className="h-12 w-12 rounded-xl"
              priority
            />
            <div className="flex w-48 grow flex-col">
              <p className="text-lg">{name}</p>
              <p className="text-gray-500">{lastMessage.message}</p>
            </div>
            <p className="text-sm text-gray-500">{handleDate(updatedAt)}</p>
          </li>
        ))
      ) : (
        '참여중인 채팅방이 없습니다.'
      )}
    </ul>
  );
};

export default ChatList;
