import { FilterCategoryList } from '@/types/searchFilterCategory';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

export const useCategoryList = (categoryName?: string) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);

  if (!categoryName) return [];

  const categoryData = categoryList?.filter(({ category_name }) => category_name === categoryName);

  const filterCategoryList: FilterCategoryList[] = [];

  categoryData?.forEach(({ category_name, tags }) => {
    tags.forEach(({ tag_id, tag_name }) => {
      filterCategoryList.push({ tagId: tag_id, tagName: tag_name, categoryName: category_name });
    });
  });

  return filterCategoryList;
};
