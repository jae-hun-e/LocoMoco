import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CreatedPositionInfoStore {
  createdPositionInfo: Position;
  setCreatedPositionInfo: (newCreatedPositionInfo: Position) => void;
}

interface Position {
  address: string;
  latitude: number;
  longitude: number;
  city: string;
}

export const useCreatedPositionInfo = create<CreatedPositionInfoStore>()(
  devtools(
    (set) => ({
      createdPositionInfo: {
        address: '',
        latitude: 0,
        longitude: 0,
        city: '',
      },
      setCreatedPositionInfo: (newCreatedPositionInfo: Position) =>
        set({ createdPositionInfo: newCreatedPositionInfo }),
    }),
    {
      name: 'current-created-position-info',
    },
  ),
);

export default useCreatedPositionInfo;
