import client from '../core';

export interface ChatType {
  chatMessageId: number;
  chatRoomId: number;
  createdAt: string;
  message: string;
  senderId: number;
  senderNickName: string;
  senderProfileImage: string | null;
}

export const getChatList = async () =>
  client.get({
    url: `chats/rooms/${localStorage.getItem('userId')}`,
    headers: {
      Authorization: localStorage.getItem('token'),
      provider: localStorage.getItem('provider'),
    },
  });
