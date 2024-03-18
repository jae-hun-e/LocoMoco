import { ChatType } from '@/types/chat';
import { getItem } from '@/utils/storage';
import client from '../core';

interface ChatRoomInfo {
  name: string;
  roomId: number;
  mogakkoId: number;
  profileImg: string;
  createdAt: string;
  updatedAt: string;
  lastMessage: ChatType;
  participantCnt: number;
}

export const getChatList = async () =>
  client.get<ChatRoomInfo[]>({
    url: `chats/rooms/${getItem(localStorage, 'userId')}`,
    headers: {
      Authorization: `Bearer ${getItem(localStorage, 'token')}`,
      provider: getItem(localStorage, 'provider'),
    },
  });
