'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   window.kakao.maps.load(function () {
  //     if (mapRef.current != null) {
  //       const mapOption = {
  //         center: new window.kakao.maps.LatLng(33.450701, 126.570667),
  //         level: 3,
  //       };
  //       new window.kakao.maps.Map(mapRef.current, mapOption);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      new window.kakao.maps.Map(mapRef.current, options);
    });
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        className="h-[calc(100svh-3.125rem-7.5rem)] w-full"
      />
    </div>
  );
};

export default Map;
