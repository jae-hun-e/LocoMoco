import { TagType } from '@/apis/mgc/queryFn';
import { TagMapProps, useTagMapping } from '@/hooks/useTagMapping';

interface FilterTagItem {
  tags: TagType[];
  categoryName: string;
}
export const useFilterTagsByIds = (tagIds: number[]) => {
  const tagMapping = useTagMapping();
  const selectTags: TagMapProps[] = [];

  tagIds.forEach((tagId) => {
    const tagMapValues = tagMapping.get(tagId);
    tagMapValues && selectTags.push(tagMapValues);
  });

  const result: FilterTagItem[] = [];

  selectTags.forEach(({ tagId, tagName, categoryName }) => {
    const existingCategory = result.find((item) => item.categoryName === categoryName);

    if (existingCategory) {
      existingCategory.tags.push({ tag_id: tagId, tag_name: tagName });
    } else {
      result.push({
        categoryName,
        tags: [{ tag_id: tagId, tag_name: tagName }],
      });
    }
  });

  return result;
};
