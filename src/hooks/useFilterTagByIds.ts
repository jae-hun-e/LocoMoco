import { useTagMapping } from '@/hooks/useTagMapping';

interface ResultType {
  categoryName: string;
  tagNames: string[];
  tagId: number;
}
export const useFilterTagsByIds = (tagIds: number[]): ResultType[] => {
  const result: Record<string, string[]> = {};
  const tagMapping = useTagMapping();

  tagIds.forEach((tagId) => {
    const tagMapValues = tagMapping.get(tagId);

    if (tagMapValues) {
      const { categoryName, tagName } = tagMapValues;

      result[categoryName] = result[categoryName] ? [...result[categoryName], tagName] : [tagName];
    }
  });

  return Object.entries(result).map(([categoryName, tagNames]) => ({
    categoryName,
    tagNames,
    tagId: tagIds.find((tagId) => {
      const tagMapValues = tagMapping.get(tagId);

      return tagMapValues?.categoryName === categoryName;
    }) as number,
  }));
};
