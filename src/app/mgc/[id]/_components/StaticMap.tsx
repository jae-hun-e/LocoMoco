import { useEffect, useRef } from 'react';
import { LocationInfo } from '@/apis/mgc/queryFn';

interface Props {
  location: LocationInfo;
}

const StaticMap = ({ location: { address, latitude, longitude } }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(function () {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const position = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({ position, image: markerImage });

      if (mapRef.current != null) {
        const mapOption = {
          center: position, // 이미지 지도의 중심좌표
          level: 3, // 이미지 지도의 확대 레벨
          marker: { position },
        };

        const staticMap = new window.kakao.maps.StaticMap(mapRef.current, mapOption);
        marker.setMap(staticMap);
      }
    });
  }, [mapRef]);

  return (
    <>
      <div
        className="mb-10pxr mt-30pxr h-150pxr w-full bg-layer-5"
        ref={mapRef}
      ></div>
      <div className="text-sm">장소: {address}</div>
    </>
  );
};

export default StaticMap;
