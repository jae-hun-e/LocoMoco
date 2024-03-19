import { toast } from '@/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';
import client from '../core';

interface ReportData {
  reporterId: number;
  reportedId: number;
  content: string;
}

export const createReport = async (reportData: ReportData) => {
  return await client.post({
    url: '/reports',
    data: reportData,
  });
};

const useCreateReport = () => {
  return useMutation({
    mutationFn: createReport,
    onSuccess() {
      toast({
        description: '신고가 완료되었습니다.',
      });
    },
    onError() {
      toast({
        description: '오류가 발생했습니다. 다시 시도해주세요.',
      });
    },
  });
};

export default useCreateReport;
