import { Fragment } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChatType } from '../[id]/page';
import Message from './Message';

interface Props {
  talks: ChatType[] | undefined;
}

const myId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

const Messages = ({ talks }: Props) => {
  return (
    <div className="flex h-[calc(100vh-288px)] flex-col gap-1">
      <div className="flex w-[60%] self-center rounded-3xl bg-main-5 text-center">
        <p className="flex w-full justify-center">
          {talks &&
            talks?.length !== 0 &&
            format(talks[0].createdAt, 'yyyy-MM-dd-E', { locale: ko })}
        </p>
      </div>
      {talks &&
        talks.map((talk, idx) => {
          const notMe = talk.senderId.toString() !== myId;
          const commonBorder = 'rounded-bl-lg rounded-br-lg';
          const createDate = format(talk.createdAt, 'yyyy-MM-dd-E', { locale: ko });

          return (
            <Fragment key={talk.chatMessageId}>
              {idx > 0 &&
                format(talks[idx - 1].createdAt, 'yyyy-MM-dd-E', { locale: ko }) !== createDate && (
                  <div className="flex w-[60%] self-center rounded-3xl bg-main-5 text-center">
                    <p className="flex w-full justify-center">{createDate}</p>
                  </div>
                )}
              <Message
                notMe={notMe}
                commonBorder={commonBorder}
                talk={talk}
              />
            </Fragment>
          );
        })}
    </div>
  );
};
export default Messages;
