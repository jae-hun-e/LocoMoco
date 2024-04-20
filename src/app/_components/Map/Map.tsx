'use client';

import { ReactNode, createContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils';

interface MapProps {
  width?: string;
  height?: string;
  isCustomlevelController?: boolean;
  children?: ReactNode;
  level?: number;
}

export const MapContext = createContext<kakao.maps.Map | undefined>(undefined);

const Map = ({ width, height, isCustomlevelController = false, children, level }: MapProps) => {
  const [map, setMap] = useState<kakao.maps.Map>();
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(function () {
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
    });
  }, [isCustomlevelController, level]);

  return (
    <MapContext.Provider value={map}>
      {children}
      <div
        id="map"
        ref={mapRef}
        className={cn(`h-${height ?? '[calc(100svh-3.125rem-7.5rem)]'} w-${width ?? 'full'}`)}
      ></div>
    </MapContext.Provider>
  );
};

export default Map;
