'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useKakaoMapService from '@/libs/kakaoMapWrapper';
import { MapContext } from './MapProvider';

export const geocoderContext = createContext<kakao.maps.services.Geocoder | undefined>(undefined);

const GeocoderProvider = ({ children }: { children: ReactNode }) => {
  const map = useContext(MapContext);
  const mapService = useKakaoMapService();

  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();

  useEffect(() => {
    if (map) {
      const geocoder = mapService.createGeocoder();

      setGeocoder(geocoder);
    }
  }, [map]);

  return <geocoderContext.Provider value={geocoder}>{children}</geocoderContext.Provider>;
};

export default GeocoderProvider;
