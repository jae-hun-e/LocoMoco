import { LocationInfo } from '@/apis/mgc/queryFn';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CreatedPositionInfoStore {
  createdPositionInfo: LocationInfo;
  setCreatedPositionInfo: (newCreatedPositionInfo: LocationInfo) => void;
}

export const useCreatedPositionInfo = create<CreatedPositionInfoStore>()(
  devtools(
    (set) => ({
      createdPositionInfo: {
        address: '',
        latitude: 0,
        longitude: 0,
        city: '',
        hCity: '',
      },
      setCreatedPositionInfo: (newCreatedPositionInfo: LocationInfo) =>
        set({ createdPositionInfo: newCreatedPositionInfo }),
    }),
    {
      name: 'current-created-position-info',
    },
  ),
);

export default useCreatedPositionInfo;
