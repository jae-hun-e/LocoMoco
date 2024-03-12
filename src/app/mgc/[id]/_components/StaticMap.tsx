import { useEffect, useRef } from 'react';
import { LocationInfo } from '@/apis/mgc/queryFn';

interface Props {
  location: LocationInfo;
}

const StaticMap = ({ location: { address, latitude, longitude } }: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      const position = new kakao.maps.LatLng(latitude, longitude);
      const marker = new kakao.maps.Marker({ position, image: markerImage });

      if (mapRef.current != null) {
        const mapOption = {
          center: position,
          level: 3,
          marker: { position },
        };

        const staticMap = new window.kakao.maps.Map(mapRef.current, mapOption);
        staticMap.setDraggable(false);
        staticMap.setZoomable(false);
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
