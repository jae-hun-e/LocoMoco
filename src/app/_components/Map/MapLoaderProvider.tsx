'use client';

import { ReactNode, useEffect } from 'react';
import useKakaoMapLoad from '@/store/useKakaoMapLoad';

const MapLoaderProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { isLoad, setIsLoad } = useKakaoMapLoad();

  useEffect(() => {
    if (!isLoad) {
      window.kakao.maps.load(() => {
        setIsLoad(true);
      });
    }
  }, [isLoad, setIsLoad]);

  return <>{children}</>;
};

export default MapLoaderProvider;
