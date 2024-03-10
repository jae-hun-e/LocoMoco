'use client';

import client from '@/apis/core';
import { useQuery } from '@tanstack/react-query';
import { differenceInDays, format, getYear } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const chatList = [
  {
    name: 'good',
    roomId: 0,
    profileImg: '/oh.png',
    updatedAt: '2024-03-02T11:38:30',
    lastMsg: 'This is Last chat',
  },
  {
    name: 'good',
    roomId: 0,
    profileImg: '/oh.png',
    updatedAt: '2024-03-01T11:38:30',
    lastMsg: 'This is Last chat',
  },
  {
    name: 'good',
    roomId: 0,
    profileImg: '/oh.png',
    updatedAt: '2024-02-29T11:38:30',
    lastMsg: 'This is Last chat',
  },
  {
    name: 'good',
    roomId: 0,
    profileImg: '/oh.png',
    updatedAt: '2023-02-29T11:38:30',
    lastMsg: 'This is Last chat',
  },
];

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

  const { data, isLoading } = useQuery({
    queryKey: ['chatList'] as const,
    queryFn: () =>
      client.get<ResponseType>({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/rooms/${localStorage.getItem('userId')}`,
        headers: {
          Authorization: localStorage.getItem('token'),
          provider: localStorage.getItem('provider'),
        },
      }),
  });

  //Todo: 실제 데이터 사용하기
  console.log(data);
  isLoading;

  return (
    <ul className="flex flex-col gap-2">
      {chatList.map(({ roomId, name, profileImg, updatedAt, lastMsg }, idx) => (
        <li
          key={idx}
          className="flex items-center justify-between gap-2"
          onClick={() => router.push(`chat/${roomId}`)}
        >
          <Image
            src={profileImg}
            width={48}
            height={48}
            alt="profile"
            className="rounded-xl"
            priority
          />
          <div className="flex w-48 grow flex-col">
            <p className="text-lg">{name}</p>
            <p className="text-gray-500">{lastMsg}</p>
          </div>
          <p className="text-sm text-gray-500">{handleDate(updatedAt)}</p>
        </li>
      ))}
    </ul>
  );
};

export default ChatList;
