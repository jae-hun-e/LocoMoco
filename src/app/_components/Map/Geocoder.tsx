'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MapContext } from './Map';

export const geocoderContext = createContext<kakao.maps.services.Geocoder | undefined>(undefined);

const Geocoder = ({ children }: { children: ReactNode }) => {
  const map = useContext(MapContext);
  const [geocoder, setGeocoder] = useState<kakao.maps.services.Geocoder>();

  useEffect(() => {
    if (map) {
      const geocoder = new kakao.maps.services.Geocoder();

      setGeocoder(geocoder);
    }
  }, [map]);

  return <geocoderContext.Provider value={geocoder}>{children}</geocoderContext.Provider>;
};

export default Geocoder;
