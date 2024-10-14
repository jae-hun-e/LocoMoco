import { Fragment } from 'react';
import { ChatType } from '@/types/chat';
import { getItem } from '@/utils/storage';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Message from './Message';
import NotMessage from './NotMessage';

interface Props {
  talks: ChatType[] | undefined;
}

const myId = typeof window !== 'undefined' ? getItem(localStorage, 'userId') : null;

const Messages = ({ talks }: Props) => {
  return (
    <div className="flex h-[calc(100vh-292px)] flex-col gap-1">
      <NotMessage>
        {talks && talks?.length !== 0 && format(talks[0].createdAt, 'yyyy-MM-dd-E', { locale: ko })}
      </NotMessage>

      {talks &&
        talks.map((talk, idx) => {
          const notMe = talk.senderId.toString() !== myId;
          const commonBorder = 'rounded-bl-lg rounded-br-lg';
          const createDate = format(talk.createdAt, 'yyyy-MM-dd-E', { locale: ko });

          return (
            <Fragment key={talk.chatMessageId}>
              {idx > 0 &&
                format(talks[idx - 1].createdAt, 'yyyy-MM-dd-E', { locale: ko }) !== createDate && (
                  <NotMessage>{createDate}</NotMessage>
                )}
              {talk.isNotice ? (
                <NotMessage>{talk.message}</NotMessage>
              ) : (
                <Message
                  notMe={notMe}
                  commonBorder={commonBorder}
                  talk={talk}
                />
              )}
            </Fragment>
          );
        })}
    </div>
  );
};
export default Messages;
