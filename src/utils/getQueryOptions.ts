import { getCategory } from '@/apis/mgc/queryFn';
import { queryOptions } from '@tanstack/react-query';

export const getCategoryOptions = () =>
  queryOptions({ queryKey: ['category'], queryFn: () => getCategory({ type: 'MOGAKKO' }) });
