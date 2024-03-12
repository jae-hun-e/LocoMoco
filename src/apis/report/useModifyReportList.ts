import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../core';

export const modifyReportList = async (targetId: number, content: string) => {
  return await client.patch({
    url: `/reports/${targetId}`,
    data: content,
  });
};

const useModifyReportlist = (targetId: number, content: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => modifyReportList(targetId, content),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
    },
  });

  return { modifyReportList: mutate, ...rest };
};

export default useModifyReportlist;
