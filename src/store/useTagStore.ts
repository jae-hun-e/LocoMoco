import { createStore } from 'zustand/vanilla';

export interface TagMapping {
  tagId: number;
  tagName: string;
  categoryName: string;
}
// interface TagsMappingStore {
//   tagMap: Map<number, TagMapping>;
//   setTagMap: (newMap: Map<number, TagMapping>) => void;
// }
//
// const useTagStore = create<TagsMappingStore>((set) => ({
//   tagMap: new Map(),
//   setTagMap: (newMap) => set({ tagMap: newMap }),
// }));
//
// export default useTagStore;

export interface TagMapState {
  tagMap: Map<number, TagMapping>;
}

export interface TagMapActions {
  setTagMap: (newMap: Map<number, TagMapping>) => void;
}
export type TagMapStore = TagMapState & TagMapActions;

export const defaultInitState: TagMapState = {
  tagMap: new Map(),
};

export const tagMapStore = (initState: TagMapState = defaultInitState) => {
  return createStore<TagMapStore>()((set) => ({
    ...initState,
    setTagMap: (newMap) => set({ tagMap: newMap }),
  }));
};
