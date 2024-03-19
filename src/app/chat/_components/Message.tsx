import { Fragment, useEffect, useRef } from 'react';
import { ChatType } from '@/types/chat';
import { format } from 'date-fns';
import Image from 'next/image';

interface Props {
  notMe: boolean;
  commonBorder: string;
  talk: ChatType;
}

const Message = ({
  notMe,
  commonBorder,
  talk: { chatMessageId, senderProfileImage, senderNickName, message, createdAt },
}: Props) => {
  const scroll = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!notMe) scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notMe, chatMessageId]);

  const handleLineFeed = (msg: string) => {
    if (!msg) return;
    return msg.split('\n').map((line, idx) => {
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
  };

  return (
    <div
      ref={scroll}
      className={`flex w-full flex-col ${notMe ? 'items-start' : 'items-end'}`}
      key={chatMessageId}
    >
      <div className="flex items-center gap-1">
        {notMe && (
          <Image
            className="h-8 w-8 rounded-3xl"
            src={senderProfileImage || '/oh.png'}
            alt="profile image"
            width={32}
            height={32}
            priority
          />
        )}
        <p>{notMe && senderNickName}</p>
      </div>
      <div className={`flex gap-1 ${notMe ? '' : 'flex-row-reverse'}`}>
        <p
          className={`mt-1 border-t ${
            notMe
              ? `ml-8 ${commonBorder} rounded-tr-lg bg-main-4`
              : `${commonBorder} rounded-tl-lg bg-hover text-white`
          } p-2`}
        >
          {handleLineFeed(message)}
        </p>
        <p className="self-end text-xs text-slate-500">{format(createdAt, 'bh:mm')}</p>
      </div>
    </div>
  );
};
export default Message;
