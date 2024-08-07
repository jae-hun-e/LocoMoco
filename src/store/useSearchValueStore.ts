import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface SearchValueStore {
  searchValue: Position;
  setSearchValue: (newSearchValue: Position) => void;
}

export interface Position {
  address?: string;
  tags?: number[];
}

export const useSearchValueStore = create<SearchValueStore>()(
  devtools(
    (set) => ({
      searchValue: {
        address: '서울특별시 서초구 서초2동', // 지도의 기본 중심 좌표값에 해당하는 주소
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
