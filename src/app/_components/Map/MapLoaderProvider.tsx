'use client';

import { ReactNode, useEffect } from 'react';
import useKakaoMapLoad from '@/store/useKakaoMapLoad';

const MapLoaderProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { setIsLoad } = useKakaoMapLoad();

  useEffect(() => {
    window.kakao.maps.load(function () {
      setIsLoad(true);
    });
  }, [setIsLoad]);

  return <>{children}</>;
};

export default MapLoaderProvider;
