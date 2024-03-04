import { TagMapping } from '@/store/useTagStore';

interface ResultType {
  categoryName: string;
  tagNames: string[];
}
export const filterTagsByIds = (
  tagMap: Map<number, TagMapping>,
  tagIds: number[],
): ResultType[] => {
  const result: Record<string, string[]> = {};

  tagIds.forEach((tagId) => {
    const tagMapping = tagMap.get(tagId);

    if (tagMapping) {
      const { categoryName, tagName } = tagMapping;

      result[categoryName] = result[categoryName] ? [...result[categoryName], tagName] : [tagName];
    }
  });

  return Object.entries(result).map(([categoryName, tagNames]) => ({
    categoryName,
    tagNames,
  }));
};
