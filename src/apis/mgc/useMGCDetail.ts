import { testQuery } from '@/apis/mgc/queryFn';
import { useSuspenseQuery } from '@tanstack/react-query';

const useMGCDetail = (MGCId: number) => {
  const { data, ...rest } = useSuspenseQuery({
    queryKey: ['mgc', MGCId],
    queryFn: () => testQuery(MGCId),
  });

  return { MGCDetail: data, ...rest };
};

export default useMGCDetail;
