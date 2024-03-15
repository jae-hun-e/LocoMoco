'use client';

import { useEffect, useRef, useState } from 'react';
import client from '@/apis/core';
import ChatInput from '@/app/chat/_components/ChatInput';
import Messages from '@/app/chat/_components/Messages';
import { Button } from '@/components/ui/button';
import { getItem } from '@/utils/storage';
import { Client } from '@stomp/stompjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import SockJS from 'sockjs-client';

export interface ChatType {
  isNotice: boolean;
  chatMessageId: number;
  chatRoomId: number;
  createdAt: string;
  message: string;
  senderId: number;
  senderNickName: string;
  senderProfileImage: string | null;
}

const ChatRoom = ({ params: { id } }: { params: { id: string } }) => {
  const [talks, setTalks] = useState<ChatType[]>([]);
  const [stop, setStop] = useState(false);
  const stomp = useRef<Client>(new Client());
  const input = useRef<HTMLTextAreaElement>(null);

  const fetchChats = async ({ pageParam }: { pageParam: number }) => {
    console.log('fetching chat...');
    const data = await client.get<ChatType[]>({
      url: `/chats/room/${id}/messages?${pageParam === 0 ? '' : `cursor=${pageParam}&`}pageSize=20`,
    });
    setTalks([...data, ...talks]);
    console.log(data);
    if (data.length < 20) setStop(true);
    return data;
  };

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['moreChat'],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: () => {
      if (stop || talks.length === 0) return undefined;
      return talks[0].chatMessageId;
    },
  });

  const disconnect = () => {
    stomp.current.deactivate();
    console.log('채팅이 종료되었습니다.');
  };

  useEffect(() => {
    const subscribe = () => {
      stomp.current.subscribe(`/sub/chat/room/${id}`, (body) => {
        const parsedBody = JSON.parse(body.body);
        console.log(parsedBody, 'subscribe');
        if (!talks || !parsedBody.senderNickName) return;
        setTalks((prev) => [...prev, parsedBody]);
      });
    };

    const connect = () => {
      stomp.current = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/stomp/chat`),
        onConnect: () => {
          console.log('Connection success');
          subscribe();
        },
      });

      stomp.current.activate();
    };

    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendMessage = () => {
    const text = input.current!.value;
    if (!text.trim()) return;
    if (text.length > 255) {
      alert(`채팅은 255자를 넘길 수 없습니다. (현재: ${text.length}자)`);
      return;
    }
    input.current?.value.length;
    stomp.current.publish({
      destination: '/pub/chats/message',
      body: JSON.stringify({
        chatRoomId: id, // 채팅방 ID
        senderId: getItem(localStorage, 'userId'),
        message: input.current!.value, // 메시지 내용
      }),
    });
    input.current!.value = '';
  };

  return (
    <section className="flex flex-col">
      <Messages talks={talks} />
      <ChatInput
        ref={input}
        sendMessage={sendMessage}
      />
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          className="absolute h-5 opacity-30"
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? 'Loading' : '이전 대화 불러오기'}
        </Button>
      )}
    </section>
  );
};
export default ChatRoom;
