import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface InfoWindowPositionStore {
  infoWindowPosition: Position;
  setInfoWindowPosition: (newInfoWindowPosition: Position) => void;
}

interface Position {
  latitude: number;
  longitude: number;
}

export const useInfoWindowPosition = create<InfoWindowPositionStore>()(
  devtools(
    (set) => ({
      infoWindowPosition: {
        latitude: 0,
        longitude: 0,
      },
      setInfoWindowPosition: (newInfoWindowPosition: Position) =>
        set({ infoWindowPosition: newInfoWindowPosition }),
    }),
    {
      name: 'current-infoWindow-position',
    },
  ),
);

export default useInfoWindowPosition;
