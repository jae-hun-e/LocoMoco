import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface CenterPositionStore {
  centerPosition: Position;
  setCenterPosition: (newCenterPositions: Position) => void;
}

interface Position {
  latitude: number;
  longitude: number;
}

export const useCenterPosition = create<CenterPositionStore>()(
  devtools(
    (set) => ({
      centerPosition: {
        latitude: 0,
        longitude: 0,
      },
      setCenterPosition: (newCenterPositions: Position) =>
        set({ centerPosition: newCenterPositions }),
    }),
    {
      name: 'current-position',
    },
  ),
);

export default useCenterPosition;
