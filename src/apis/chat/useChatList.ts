import { useQuery } from '@tanstack/react-query';
import { getChatList } from './queryFn';

const useChatList = () =>
  useQuery({
    queryKey: ['chatList'] as const,
    queryFn: getChatList,
  });

export default useChatList;
