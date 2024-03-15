'use client';

import { useEffect, useRef, useState } from 'react';
import client from '@/apis/core';
import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import Modal from '@/app/_components/Modal';
import UserList from '@/app/_components/UserInfoAndButton/UserList';
import ChatInput from '@/app/chat/_components/ChatInput';
import Messages from '@/app/chat/_components/Messages';
import { Button } from '@/components/ui/button';
import { useThunderModalStore } from '@/store/thunderModalStore';
import { getItem } from '@/utils/storage';
import { Client } from '@stomp/stompjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import SockJS from 'sockjs-client';
import Review from '../_components/review/Review';

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

  const [isUserList, setIsUserList] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);

  // TODO: params에 들어갈 값 모각코id로 할지 회의 후 수정(현재 id는 모각코 id) [24.03.15]
  const { mgcDetail } = useGetMGCDetail(parseInt(id, 10));

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

  const { isOpen, toggleModal } = useThunderModalStore();

  const handleCloseModal = () => {
    toggleModal();
    setIsUserList(true);
  };

  const handleButtonClick = (targetId: number) => {
    setSelectedUserId(targetId);
    setIsUserList(false);
  };

  return (
    <div>
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
        <Modal
          isOpen={isOpen}
          onClose={handleCloseModal}
          width="full"
          height="full"
          rounded="none"
        >
          <div className="p-20pxr">
            <button onClick={handleCloseModal}>
              <X />
            </button>
            {isUserList ? (
              <UserList
                data={[...mgcDetail.participants, mgcDetail.creatorInfo]}
                onClick={handleButtonClick}
                buttonName="후기 보내기"
              />
            ) : (
              <Review
                MGCId={id}
                revieweeId={selectedUserId}
                onCancel={() => setIsUserList(true)}
              />
            )}
          </div>
        </Modal>
      </section>
    </div>
  );
};
export default ChatRoom;
