import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../core';

export const deleteBlackList = async (userId: number, blockedId: number) => {
  return await client.delete({
    url: `/users/${userId}/blacklist`,
    params: { userId, blockedId },
  });
};

const useDeleteBlacklist = (userId: number, blockedId: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteBlackList(userId, blockedId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['blackList', userId] });
    },
  });

  return { deleteBlackList: mutate, ...rest };
};

export default useDeleteBlacklist;
