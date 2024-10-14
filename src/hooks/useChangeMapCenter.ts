import { useCallback, useContext } from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import useKakaoMapService from '@/libs/kakaoMapWrapper';

const useChangeMapCenter = () => {
  const map = useContext(MapContext);
  const mapService = useKakaoMapService();

  const changeCenter = useCallback(
    (latitude: number, longitude: number, mode?: 'smooth' | 'default') => {
      if (map) {
        const movePosition = mapService.createLatLng(latitude, longitude);
        if (mode === 'smooth') {
          map.panTo(movePosition);
        } else {
          map.setCenter(movePosition);
        }
      }
    },
    [map],
  );

  return {
    changeCenter,
  };
};

export default useChangeMapCenter;
