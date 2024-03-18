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
