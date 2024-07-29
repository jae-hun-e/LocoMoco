'use client';

import { useEffect, useRef, useState } from 'react';
import client from '@/apis/core';
import { useGetMGCDetail } from '@/apis/mgc/useGetMGCDetail';
import Modal from '@/app/_components/Modal';
import UserList from '@/app/_components/UserInfoAndButton/UserList';
import ChatInput from '@/app/chat/_components/ChatInput';
import Messages from '@/app/chat/_components/Messages';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import useSendPush from '@/hooks/useSendPush';
import { useThunderModalStore } from '@/store/thunderModalStore';
import { ChatType } from '@/types/chat';
import { getItem } from '@/utils/storage';
import { Client } from '@stomp/stompjs';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { X } from 'lucide-react';
import SockJS from 'sockjs-client';
import Review from '../_components/review/Review';

const ChatRoom = ({ params: { mgcId } }: { params: { mgcId: string } }) => {
  const [talks, setTalks] = useState<ChatType[]>([]);
  const [stop, setStop] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(0);
  const stomp = useRef<Client>(new Client());
  const input = useRef<HTMLTextAreaElement>(null);

  const [isUserList, setIsUserList] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const { mgcDetail } = useGetMGCDetail(parseInt(mgcId, 10));
  const { sendPush } = useSendPush();

  const fetchChats = async ({ pageParam }: { pageParam: number }) => {
    console.log('===== fetching chat... =====');
    const data = await client.get<ChatType[]>({
      url: `/chats/room/${chatRoomId}/messages?${pageParam === 0 ? '' : `cursor=${pageParam}&`}pageSize=20`,
    });
    setTalks([...data, ...talks]);
    if (data.length < 20) setStop(true);
    return data;
  };

  useQuery({
    queryKey: ['mgc2chat', mgcId],
    queryFn: async () => {
      const id = await client.get<number>({ url: `/chats/room/mogakko/${mgcId}` });
      setChatRoomId(id);
      return id;
    },
  });

  const { hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['moreChat'],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: () => {
      if (stop || talks.length === 0) return undefined;
      return talks[0].chatMessageId;
    },
    enabled: !!chatRoomId,
  });

  const disconnect = () => {
    stomp.current.deactivate();
    console.log('===== Disconnected =====');
  };

  useEffect(() => {
    const subscribe = () => {
      stomp.current.subscribe(`/sub/chat/room/${chatRoomId}`, ({ body }) => {
        const parsedBody = JSON.parse(body);
        if (!talks || !parsedBody.senderNickName) return;
        setTalks((prev) => [...prev, parsedBody]);
      });
    };

    const connect = () => {
      stomp.current = new Client({
        webSocketFactory: () => new SockJS(`${process.env.NEXT_PUBLIC_BASE_URL}/stomp/chat`),
        onConnect: () => {
          console.log('===== Connected =====');
          subscribe();
        },
      });

      stomp.current.activate();
    };

    connect();

    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  const sendMessage = () => {
    const text = input.current!.value;

    if (!text.trim()) return;
    if (text.length > 255) {
      toast({ description: `채팅은 255자를 넘길 수 없습니다. (현재: ${text.length}자)` });
      return;
    }

    const myId = getItem(localStorage, 'userId');

    stomp.current.publish({
      destination: '/pub/chats/message',
      body: JSON.stringify({
        chatRoomId: chatRoomId, // 채팅방 Id
        senderId: myId,
        message: text, // 메시지 내용
      }),
    });
    const { participants } = mgcDetail;
    if (participants.length > 1) {
      const sender = participants.filter((e) => e === myId)[0];
      sendPush({
        data: {
          image: sender.profileImage.path,
          title: `${sender.nickname}의 메세지`,
          body: text,
          click_action: window.location.href,
        },
        userIds: participants.map(({ userId }) => userId + '').filter((e) => e !== myId),
      });
    }

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
            {isUserList && mgcDetail ? (
              <UserList
                data={[...mgcDetail.participants]}
                onClick={handleButtonClick}
                buttonName="후기 보내기"
              />
            ) : (
              <Review
                MGCId={mgcId}
                revieweeId={selectedUserId}
                onCancel={() => setIsUserList(true)}
                isEnd={new Date(mgcDetail.MogakkoInfo.endTime) <= new Date()}
              />
            )}
          </div>
        </Modal>
      </section>
    </div>
  );
};
export default ChatRoom;
