import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../core';

export const deleteReportList = async (targetId: number) => {
  return await client.delete({
    url: `/reports/${targetId}`,
  });
};

const useDeleteReportlist = (targetId: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteReportList(targetId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  return { deleteReportList: mutate, ...rest };
};

export default useDeleteReportlist;
