'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MapContext } from './Map';

interface GeocoderProps {
  minLevel?: number;
  children: ReactNode;
}

export const geocoderContext = createContext<kakao.maps.services.Geocoder | undefined>(undefined);

const Geocoder = ({ minLevel, children }: GeocoderProps) => {
  const map = useContext(MapContext);
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();

  useEffect(() => {
    if (map) {
      const geocoder = new kakao.maps.services.Geocoder();

      setGeocoder(geocoder);
    }
  }, [map, minLevel]);

  return <geocoderContext.Provider value={geocoder}>{children}</geocoderContext.Provider>;
};

export default Geocoder;
