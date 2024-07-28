'use client';

import { ReactNode, RefObject, createContext, useEffect, useState } from 'react';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import useKakaoMapLoad from '@/store/useKakaoMapLoad';

interface MapProps {
  isCustomlevelController?: boolean;
  children: ReactNode;
  level?: number;
  mapRef: RefObject<HTMLDivElement>;
}

export const MapContext = createContext<kakao.maps.Map | undefined>(undefined);

const MapProvider = ({ isCustomlevelController, children, level, mapRef }: MapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const mapService = useKakaoMapService();
  const { isLoad } = useKakaoMapLoad();

  useEffect(() => {
    if (isLoad) {
      if (mapRef && mapRef.current != null) {
        const mapOption = {
          center: mapService.createLatLng(37.492074, 127.029781),
          level: level ?? 3,
        };
        const createdMap = mapService.createMap(mapRef.current, mapOption);
        if (!isCustomlevelController) {
          mapService.addZoomControl('TOPRIGHT');
        }
        setMap(createdMap);
      }
    }
  }, [isCustomlevelController, isLoad, level, mapRef]);

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export default MapProvider;
