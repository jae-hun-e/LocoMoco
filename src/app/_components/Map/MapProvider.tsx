'use client';

import { ReactNode, RefObject, createContext, useEffect, useState } from 'react';
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
  const { isLoad } = useKakaoMapLoad();

  useEffect(() => {
    if (isLoad) {
      if (mapRef && mapRef.current != null) {
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.492074, 127.029781),
          level: level ?? 3,
        };

        const createdMap = new window.kakao.maps.Map(mapRef.current, mapOption);

        if (!isCustomlevelController) {
          const zoomControl = new kakao.maps.ZoomControl();
          createdMap.addControl(zoomControl, kakao.maps.ControlPosition.TOPRIGHT);
        }

        setMap(createdMap);
      }
    }
  }, [isCustomlevelController, isLoad, level, mapRef]);

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export default MapProvider;
