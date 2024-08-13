'use client';

import { useEffect, useState } from 'react';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { ChatType } from '@/types/chat';
import { getItem } from '@/utils/storage';
import { useInfiniteQuery } from '@tanstack/react-query';
import { differenceInDays, format, getYear } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ChatRoomInfo {
  name: string;
  roomId: number;
  mogakkoId: number;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ChatType;
  participantCnt: number;
}

const ChatList = () => {
  const router = useRouter();
  const [chatRooms, setChatRooms] = useState<ChatRoomInfo[]>([]);
  const [stop, setStop] = useState(false);
  const userId = getItem(localStorage, 'userId');

  const handleDate = (date: string) => {
    const dateDiff = differenceInDays(new Date(), date);
    if (dateDiff === 0) return format(date, 'bh:mm');
    else if (dateDiff === 1) return '어제';
    else {
      if (getYear(date) === getYear(new Date())) return format(date, 'MM-dd');
      else return format(date, 'yyyy-MM-dd');
    }
  };

  const fetchChats = async ({ pageParam }: { pageParam: number }) => {
    const data = await client.get<ChatRoomInfo[]>({
      url: `/chats/rooms/${userId}?${pageParam === 0 ? '' : `cursor=${pageParam}&`}pageSize=10`,
      headers: {
        Authorization: `Bearer ${getItem(localStorage, 'token')}`,
        provider: getItem(localStorage, 'provider'),
      },
    });
    setChatRooms([...chatRooms, ...data]);
    if (data.length < 10) setStop(true);
    return data;
  };

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['moreChatList'],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: () => {
      if (stop || chatRooms.length === 0) return undefined;
      return chatRooms[chatRooms.length - 1].roomId;
    },
    enabled: !!userId,
  });
  console.log(hasNextPage);

  useEffect(() => {
    if (!getItem(localStorage, 'token')) router.replace('/signin');
  }, [router]);

  return (
    <ul className="flex flex-col gap-2">
      {chatRooms?.length !== 0
        ? chatRooms?.map(({ mogakkoId, lastMessage, name, updatedAt }) => (
            <li
              key={mogakkoId}
              className="flex cursor-pointer items-center justify-between gap-2"
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
        : '참여중인 채팅방이 없습니다.'}
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          className="h-5 opacity-30"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading' : '이전 채팅방 불러오기'}
        </Button>
      )}
    </ul>
  );
};

export default ChatList;
