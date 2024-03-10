'use client';

import { useEffect, useRef, useState } from 'react';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { Client } from '@stomp/stompjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import SockJS from 'sockjs-client';
import ChatInput from '../_components/ChatInput';
import Messages from '../_components/Messages';

export interface ChatType {
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
      // Todo: 생선된 모각코에 따른 다른 채팅방 보여주기
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/chats/room/${9}/messages?${pageParam === 0 ? '' : `cursor=${pageParam}&`}pageSize=20`,
      params: {
        pageSize: pageParam,
      },
    });
    setTalks([...data, ...talks]);
    if (data.length < 20) setStop(true);
    return data;
  };

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['moreChat'],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: () => {
      if (stop) return undefined;
      return talks[0].chatMessageId;
    },
  });

  const disconnect = () => {
    stomp.current.deactivate();
    console.log('채팅이 종료되었습니다.');
  };

  useEffect(() => {
    const subscribe = () => {
      stomp.current.subscribe(`/sub/chat/room/${9}`, (body) => {
        const parsedBody = JSON.parse(body.body);
        console.log(parsedBody, 'subscribe');
        if (!talks || !parsedBody.senderNickName) return;

        setTalks((prev) => [...prev, parsedBody]);
      });
    };

    const addParticipant = () => {
      stomp.current.publish({
        destination: '/pub/chats/enter',
        body: JSON.stringify({
          chatRoomId: 9,
          mogakkoId: 80,
          senderId: localStorage.getItem('userId'),
        }),
      });
    };

    const connect = () => {
      stomp.current = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/stomp/chat`),
        onConnect: () => {
          console.log('Connection success');
          subscribe();
          addParticipant();
        },
      });

      stomp.current.activate();
    };

    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sendMessage = () => {
    if (!input.current!.value.trim()) return;

    stomp.current.publish({
      destination: '/pub/chats/message',
      body: JSON.stringify({
        chatRoomId: 9, // 채팅방 ID
        senderId: localStorage.getItem('userId'), // 보내는 사람 ID
        mogakkoId: 80, // 모각코 ID
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
