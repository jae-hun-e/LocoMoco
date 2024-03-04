import { Category } from '@/apis/mgc/queryFn';
import { create } from 'zustand';

export interface TagMapping {
  tagId: number;
  tagName: string;
  categoryName: string;
}
interface TagsMappingStore<T> {
  tagMap: Map<number, TagMapping>;
  setTagMap: (categoryList: T[]) => void;
}

const useTagStore = <T extends Category['data'][0]>() =>
  create<TagsMappingStore<T>>((set) => ({
    tagMap: new Map(),
    setTagMap: (categoryList) =>
      set(() => {
        const newMap = new Map();
        categoryList?.slice(1).forEach(({ category_name, tags }) => {
          tags.forEach(({ tag_id, tag_name }) => {
            newMap.set(tag_id, { tagName: tag_name, categoryName: category_name });
          });
        });
        return { tagMap: newMap };
      }),
  }));

export default useTagStore;
