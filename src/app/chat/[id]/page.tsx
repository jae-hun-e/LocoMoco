'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Stomp } from '@stomp/stompjs';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import SockJS from 'sockjs-client';

const chatData = [
  { username: 'me', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  {
    username: 'm1',
    profileImg: '/oh.png',
    message: 'hif',
    createdAt: new Date(),
  },
  { username: 'm2', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'me', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm1', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  { username: 'm3', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
];

const ChatRoom = ({ params: { id } }: { params: { id: string } }) => {
  id;
  useEffect(() => {
    // Todo: 백엔드와 채팅기능 만들기
    const connect = () => {
      const client = Stomp.over(() => {
        return new SockJS('http://221.145.70.98:48090/api/v1/stomp/chat');
      });
      // client.connectHeaders = {
      //   Authorization: axios.defaults.headers.common.Authorization,
      // };
      client.activate(); // 클라이언트 활성화
      console.log('client connected');

      client.onConnect = () => {
        console.log('success');
        // subscribe(client, 0, null);
      };
      return client;
    };
    connect();
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex h-[calc(100vh-200px)] flex-col gap-1 overflow-y-scroll">
        {chatData.map(({ username, profileImg, message, createdAt }, idx) => {
          const notMe = username !== 'me';
          const commonBorder = 'rounded-bl-lg rounded-br-lg';

          return (
            <div
              className={`flex w-full flex-col ${notMe ? 'items-start' : 'items-end'}`}
              key={idx}
            >
              <div className="flex items-center gap-1">
                {notMe && (
                  <Image
                    className="rounded-3xl"
                    src={profileImg}
                    alt="good"
                    width={30}
                    height={30}
                  />
                )}
                <p>{notMe && username}</p>
              </div>
              <div className={`flex ${notMe ? '' : 'flex-row-reverse'}`}>
                <p
                  className={`mt-1 border-t ${
                    notMe
                      ? `ml-8 ${commonBorder} rounded-tr-lg bg-main-4`
                      : `${commonBorder} rounded-tl-lg bg-hover text-white`
                  } p-2`}
                >
                  {message}
                </p>
                <p className="self-end text-xs text-slate-500">
                  {format(createdAt, 'HH:mm', { locale: ko })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex h-150pxr flex-col ">
        <textarea className="h-80pxr resize-none border-2 border-solid" />
        <div className="flex justify-between">
          <Button>Photo</Button>
          <Button>Send</Button>
        </div>
      </div>
    </section>
  );
};
export default ChatRoom;
