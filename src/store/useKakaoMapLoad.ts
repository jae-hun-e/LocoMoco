import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MapStore {
  isLoad: boolean;
  setIsLoad: (newIsLoad: boolean) => void;
}

export const useKakaoMapLoad = create<MapStore>()(
  devtools(
    (set) => ({
      isLoad: false,
      setIsLoad: (newIsLoad: boolean) => set({ isLoad: newIsLoad }),
    }),
    {
      name: 'current-kakao-map-load',
    },
  ),
);

export default useKakaoMapLoad;
