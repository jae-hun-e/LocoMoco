import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../core';

export const modifyReportList = async (
  targetId: number | undefined,
  content: string | undefined,
) => {
  if (typeof targetId === 'undefined') return;
  return await client.patch({
    url: `/reports/${targetId}`,
    data: { content: content },
  });
};

const useModifyReportlist = (targetId: number | undefined, content: string | undefined) => {
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
