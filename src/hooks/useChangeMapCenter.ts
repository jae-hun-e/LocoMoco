import { useCallback, useContext } from 'react';
import { MapContext } from '@/app/_components/Map/Map';

const useChangeMapCenter = () => {
  const map = useContext(MapContext);

  const changeCenter = useCallback(
    (latitude: number, longitude: number) => {
      if (map) {
        const movePosition = new kakao.maps.LatLng(latitude, longitude);
        map.setCenter(movePosition);
      }
    },
    [map],
  );

  return {
    changeCenter,
  };
};

export default useChangeMapCenter;
