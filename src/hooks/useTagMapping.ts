import { useMemo } from 'react';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

interface TagMapProps {
  tagId: number;
  tagName: string;
  categoryName: string;
}

export const useTagMapping = () => {
  const queryClient = useQueryClient();

  return useMemo(() => {
    const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);
    const newTagMapping: Map<number, TagMapProps> = new Map();
    categoryList?.forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        newTagMapping.set(tag_id, {
          tagId: tag_id,
          tagName: tag_name,
          categoryName: category_name,
        });
      });
    });
    return newTagMapping;
  }, [queryClient]);
};
