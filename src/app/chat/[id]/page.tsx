'use client';

import { Fragment, useState } from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

const chatData = [
  { username: 'me', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  {
    username: 'm1',
    profileImg: '/oh.png',
    message: 'hifdsfnskjflajsdfljasdfjlasjdflasjdfljadslfjlasjdflsdajf',
    createdAt: new Date(),
  },
  { username: 'm2', profileImg: '/oh.png', message: 'hi', createdAt: new Date() },
  {
    username: 'me',
    profileImg: '/oh.png',
    message: 'hidjfgljfdslfjdkfjdkjflsj\n\ndfldksjflsdjlfkjdslfkjsdfsdfsdfdsf',
    createdAt: new Date(),
  },
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
  const [message, setMessage] = useState('');

  const handleLineFeed = (msg: string) =>
    msg.split('\n').map((line, idx) => {
      const sliced = [];
      if (line.length > 40) {
        while (line.length > 40) {
          sliced.push(line.slice(0, 40));
          line = line.slice(40);
        }
        sliced.push(line);
        return sliced.map((line, idx) => (
          <Fragment key={idx}>
            {line}
            <br />
          </Fragment>
        ));
      } else {
        return (
          <Fragment key={idx}>
            {line}
            <br />
          </Fragment>
        );
      }
    });

  return (
    <section className="flex flex-col">
      <div className="flex h-[calc(100vh-288px)] flex-col gap-1">
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
                    priority
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
                  {handleLineFeed(message)}
                </p>
                <p className="self-end text-xs text-slate-500">
                  {format(createdAt, 'HH:mm', { locale: ko })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-50pxr z-50 flex w-[calc(100%-2.5rem)] flex-col justify-between bg-layer-1">
        <textarea
          onChange={(e) => setMessage(e.target.value)}
          className="h-80pxr resize-none border-2 border-solid"
        />
        <div className="flex justify-end gap-4">
          <Button onClick={() => console.log(message)}>Photo</Button>
          <Button>Send</Button>
        </div>
      </div>
    </section>
  );
};
export default ChatRoom;
