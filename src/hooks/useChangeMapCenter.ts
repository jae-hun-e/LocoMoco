import { useCallback, useContext } from 'react';
import { MapContext } from '@/app/_components/Map/MapProvider';
import useKakaoMapService from '@/libs/kakaoMapWrapper';

const useChangeMapCenter = () => {
  const map = useContext(MapContext);
  const mapService = useKakaoMapService();

  const changeCenter = useCallback(
    (latitude: number, longitude: number) => {
      if (map) {
        const movePosition = mapService.createLatLng(latitude, longitude);
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
