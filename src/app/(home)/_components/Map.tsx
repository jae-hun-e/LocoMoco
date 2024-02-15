'use client';

import { useEffect, useRef } from 'react';

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
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    document.head.appendChild(kakaoMapScript);

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current != null) {
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };

          new window.kakao.maps.Map(mapRef.current, options);
        }
      });
    };

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI);
  }, [mapRef]);

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
