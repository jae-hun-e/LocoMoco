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
    const kakaoMapScript = document.createElement('script');
    kakaoMapScript.async = false;
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=bf972ec55af655b8d50cd16ef64fa8c0&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        console.log('동작하나?', mapRef.current);

        new window.kakao.maps.Map(mapRef.current, options);
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
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
