'use client';

import { ReactNode, createContext, useContext, useRef } from 'react';
import { TagMapStore, tagMapStore } from '@/store/useTagStore';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';
import { type StoreApi, useStore } from 'zustand';

interface Props {
  readonly children: ReactNode;
}
const TagMapStoreContext = createContext<StoreApi<TagMapStore> | null>(null);

const CategoryProvider = ({ children }: Props) => {
  const storeRef = useRef<StoreApi<TagMapStore>>();
  if (!storeRef.current) {
    storeRef.current = tagMapStore();
  }

  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);
  const setTagMap = useTagMapStore((state) => state.setTagMap);

  const tagMapping = new Map();

  if (categoryList) {
    categoryList.slice(1).forEach(({ category_name, tags }) => {
      tags.forEach(({ tag_id, tag_name }) => {
        tagMapping.set(tag_id, { tagName: tag_name, categoryName: category_name });
      });
    });
    setTagMap(tagMapping);
  }

  return (
    <TagMapStoreContext.Provider value={storeRef.current}>{children}</TagMapStoreContext.Provider>
  );
};

export default CategoryProvider;

export const useTagMapStore = <T,>(selector: (store: TagMapStore) => T): T => {
  const store = useContext(TagMapStoreContext);

  if (!store) {
    throw new Error('useTagMapStore must be used within a TagMapStoreProvider');
  }
  return useStore(store, selector);
};
