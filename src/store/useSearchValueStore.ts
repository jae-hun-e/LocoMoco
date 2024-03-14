import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchValueStore {
  searchValue: Position;
  setSearchValue: (newSearchValue: Position) => void;
}

interface Position {
  address?: string;
  tags?: number[];
}

export const useSearchValueStore = create<SearchValueStore>()(
  devtools(
    (set) => ({
      searchValue: {
        address: undefined,
        tags: undefined,
      },
      setSearchValue: (newSearchValue: Position) => set({ searchValue: newSearchValue }),
    }),
    {
      name: 'current-search-value',
    },
  ),
);

export default useSearchValueStore;
